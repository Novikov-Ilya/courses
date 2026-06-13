#!/bin/bash

# =========================================================================
# 1. ИНИЦИАЛИЗАЦИЯ И СБОР ИЗМЕНЕНИЙ GIT
# =========================================================================
echo "🔄 Fetching latest changes from master..."
git fetch origin master

# Сбор измененных, добавленных и проиндексированных файлов
CHANGED_FILES=$(git diff --name-only origin/master...HEAD 2>/dev/null && git diff --name-only 2>/dev/null && git diff --cached --name-only 2>/dev/null | sort -u)

# Жесткая проверка: если изменений нет, останавливаем процесс
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

# =========================================================================
# 2. БЕЗОПАСНАЯ ГЕНЕРАЦИЯ JSON ЗАПРОСА (ЗАЩИТА ОТ БАГОВ ЭКРАНИРОВАНИЯ WINDOWS)
# =========================================================================
# Node.js сама собирает и экранирует JSON-файл, избегая проблем со слэшами Windows
node -e "
const fs = require('fs');

// Безопасно прокидываем список файлов из bash-окружения
const changedFiles = process.env.CHANGED_FILES || \`$CHANGED_FILES\`;

const prompt = 'Analyze this modified file path: ' + changedFiles.trim() + '.\n' +
               'Classify it into exactly one architectural testing tag from this list: @ui, @validation, @auth, @security.\n' +
               'You MUST respond with a valid JSON object matching this exact schema: {\"tag\": \"@tagname\"}';

const requestBody = {
  model: 'qwen3.5:9b',
  prompt: prompt,
  stream: false,
  format: 'json',
  options: { 
    temperature: 0.0 
  }
};

fs.writeFileSync('ollama_request.json', JSON.stringify(requestBody, null, 2), 'utf-8');
"

# =========================================================================
# 3. ЗАПРОС К API ЛОКАЛЬНОЙ МОДЕЛИ OLLAMA
# =========================================================================

RESPONSE=$(curl -s -X POST http://localhost:11434/api/generate -H "Content-Type: application/json" -d @ollama_request.json)

# Чистим за собой временный файл конфигурации
rm ollama_request.json

# =========================================================================
# 4. ИЗВЛЕЧЕНИЕ И ВАЛИДАЦИЯ ТЕГА ИЗ ОТВЕТА (С ЗАЩИТОЙ ОТ THINKING-КЭША)
# =========================================================================
PLAYWRIGHT_TAGS=$(echo "$RESPONSE" | node -e "
    const fs = require('fs');
    const rawInput = fs.readFileSync(0, 'utf-8');
    try {
      const ollamaData = JSON.parse(rawInput);
      
      let finalTag = '';
      
      // 1. Пытаемся распарсить стандартный JSON из поля response
      if (ollamaData.response && ollamaData.response.trim().length > 0) {
        try {
          const innerJson = JSON.parse(ollamaData.response);
          finalTag = innerJson.tag;
        } catch(e) {}
      }
      
      // 2. Если response пуст, вытаскиваем тег напрямую из цепочки рассуждений (thinking)
      if (!finalTag && ollamaData.thinking) {
        const thought = ollamaData.thinking;
        // Ищем регулярным выражением любой из разрешенных тегов в тексте рассуждений
        const match = thought.match(/@(auth|ui|validation|security|smoke)/i);
        if (match) {
          finalTag = match[0].toLowerCase();
        }
      }
      
      // Выводим результат, убирая лишние кавычки. Если совсем пусто — ставим дефолтный @smoke
      console.log(finalTag.trim().replace(/['\"\`]/g, '') || '@smoke');
      
    } catch(e) {
      fs.writeSync(2, '\n❌ NODE PARSING ERROR: ' + e.message + '\n');
      console.log('@smoke');
    }
")

echo "============================================="
echo "🤖 AI Impact Analysis Result: Running tests matching tags -> $PLAYWRIGHT_TAGS"
echo "============================================="

# =========================================================================
# 5. ОРКЕСТРАЦИЯ ЛОКАЛЬНЫХ СЕРВЕРОВ (BACKEND & FRONTEND)
# =========================================================================
echo "🌐 Checking local environment ports..."

# Проверяем NestJS бэкенд на порту 4000
if ! curl -s http://localhost:4000/api > /dev/null; then
    echo "⚙️ NestJS Backend is offline. Starting automatically from courses-app-backend..."
    (cd ../courses-app-backend && npm run start &)
fi

# Проверяем Vite фронтенд на порту 5173
if ! curl -s http://localhost:5173 > /dev/null; then
    echo "⚙️ Frontend is offline. Starting frontend automatically..."
    npm run dev &
fi

# Ожидаем взаимной готовности обеих платформ
echo "⏳ Waiting for local servers to respond..."
for i in {1..15}; do
    if curl -s http://localhost:5173 > /dev/null && curl -s http://localhost:4000/api > /dev/null; then
        echo "✅ Infrastructure is fully synchronized and ready!"
        break
    fi
    sleep 2
done

# =========================================================================
# 6. ЗАПУСК PLAYWRIGHT С КОНТЕКСТНЫМИ ИИ-ТЕГАМИ
# =========================================================================
npx playwright test --grep "$PLAYWRIGHT_TAGS"
