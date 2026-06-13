#!/bin/bash

# 1. Обновляем информацию о ветках из удаленного репозитория
echo "🔄 Fetching latest changes from master..."
git fetch origin master

# Получаем список измененных файлов между текущей веткой и актуальным master
CHANGED_FILES=$(git diff --name-only origin/master...HEAD 2>/dev/null && git diff --name-only 2>/dev/null && git diff --cached --name-only 2>/dev/null | sort -u)

# ЖЕСТКАЯ ПРОВЕРКА: Если изменений нет — тесты вообще не запускаются
if [ -z "$CHANGED_FILES" ]; then
    echo "============================================="
    echo "🟩 AI Regression Guard: No changes detected compared to master."
    echo "🛑 Skipping test execution completely to save resources."
    echo "============================================="
    exit 0
fi

echo "========================================="
echo "Detected changed files:"
echo "$CHANGED_FILES"
echo "========================================="

# 2. Формируем структурированный JSON для эндпоинта /api/chat с системной ролью
JSON_DATA=$(cat <<EOF
{
  "model": "qwen3.5:9b",
  "messages": [
    {
      "role": "system",
      "content": "You are a strict CI/CD Test Selection Automation Agent. Analyze the user's modified files list and return EXACTLY ONE tag from this allowed list: @ui, @validation, @auth, @security, @smoke. Direct rules: 1. If files contain 'useFormValidate.ts', output strictly: @validation. 2. If files contain CSS/layout/links in 'Login.tsx', output strictly: @ui. 3. If files contain API/submitForm/logIn, output strictly: @auth. Return ONLY the raw tag string. No explanations, no markdown blocks, no quotes. Just the raw text."
    },
    {
      "role": "user",
      "content": "Modified files in this commit: $CHANGED_FILES"
    }
  ],
  "stream": false,
  "options": {
    "temperature": 0.0,
    "num_predict": 10
  }
}
EOF
)

# 3. Делаем запрос к локальной Ollama API через эндпоинт Chat
RESPONSE=$(curl -s http://localhost:11434/api/chat -d "$JSON_DATA")

# Извлекаем текст ответа из структуры JSON Chat API (ответ лежит в message.content)
PLAYWRIGHT_TAGS=$(echo "$RESPONSE" | node -e "
    const fs = require('fs');
    try {
      const data = JSON.parse(fs.readFileSync(0, 'utf-8'));
      console.log(data.message.content.trim());
    } catch(e) {
      console.log('@smoke');
    }
")

echo "============================================="
echo "🤖 AI Impact Analysis Result: Running tests matching tags -> $PLAYWRIGHT_TAGS"
echo "============================================="

echo "🌐 Checking local environment ports..."

# 1. Проверяем NestJS бэкенд на порту 4000
if ! curl -s http://localhost:4000/api > /dev/null; then
    echo "⚙️ NestJS Backend is offline. Starting automatically from courses-app-backend..."
    (cd ../courses-app-backend && npm run start &)
fi

# 2. Проверяем Vite фронтенд на порту 5173
if ! curl -s http://localhost:5173 > /dev/null; then
    echo "⚙️ Frontend is offline. Starting frontend automatically..."
    npm run dev &
fi

# 3. Ожидаем взаимной готовности обеих платформ
echo "⏳ Waiting for local servers to respond..."
for i in {1..15}; do
    if curl -s http://localhost:5173 > /dev/null && curl -s http://localhost:4000/api > /dev/null; then
        echo "✅ Infrastructure is fully synchronized and ready!"
        break
    fi
    sleep 2
done

# 4. Запускаем Playwright только с выбранными ИИ узкими тегами
npx playwright test --grep "$PLAYWRIGHT_TAGS"
