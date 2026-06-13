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

# 2. Гибкий промпт, требующий СТРОГО структуру JSON
PROMPT="Analyze this modified file path: $CHANGED_FILES. 
Classify it into exactly one architectural testing tag from this list: @ui, @validation, @auth, @security.
You MUST respond with a valid JSON object matching this exact schema: {\"tag\": \"@tagname\"}"

# 3. Записываем чистый JSON во временный файл (Windows его не сломает)
cat <<EOF > ollama_request.json
{
  "model": "qwen3.5:9b",
  "prompt": "$PROMPT",
  "stream": false,
  "format": "json",
  "options": {
    "temperature": 0.0
  }
}
EOF

# Делаем запрос к Ollama, передавая файл через @
RESPONSE=$(curl -s -X POST http://localhost:11434/api/generate -H "Content-Type: application/json" -d @ollama_request.json)

# Удаляем временный файл, чтобы не мусорить в проекте
rm ollama_request.json

# 4 Извлекаем текст ответа из структуры JSON Chat API (ответ лежит в message.content)
PLAYWRIGHT_TAGS=$(echo "$RESPONSE" | node -e "
    const fs = require('fs');
    try {
      const ollamaData = JSON.parse(fs.readFileSync(0, 'utf-8'));
      const innerJson = JSON.parse(ollamaData.response);
      const resTag = innerJson.tag.trim();
      console.log(resTag || '@validation123');
    } catch(e) {
      console.log('@validation123');
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
