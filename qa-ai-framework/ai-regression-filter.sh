#!/bin/bash

# 1. Получаем список измененных файлов в Git (между текущей веткой и main)
CHANGED_FILES=$(git diff --name-only main...HEAD)

if [ -z "$CHANGED_FILES" ]; then
    echo "No changes detected. Running smoke tests only."
    npx playwright test --grep @smoke
    exit 0
fi

# 2. Формируем промпт для локальной Qwen 3.5
PROMPT="You are a CI/CD Test Selection Agent. Given the following modified files in a React project:
$CHANGED_FILES

And given our Playwright test suite has the following test tags:
- @login (Authentication, validation)
- @courses (Viewing, creating, searching courses)

Determine which test tags MUST be executed based on the code changes. Return ONLY the tags separated by OR operator for Playwright (e.g. '@login|@courses'). If changes are unrelated to these, return '@smoke'. Do not write any explanations, just the tags string."

# 3. Делаем запрос к локальной Ollama API (модель qwen3.5:9b)
RESPONSE=$(curl -s http://localhost:11434/api/generate -d "{
  \"model\": \"qwen3.5:9b\",
  \"prompt\": \"$PROMPT\",
  \"stream\": false
}")

# Извлекаем текст ответа ИИ (используя node.js для парсинга JSON, чтобы не ставить лишних утилит)
PLAYWRIGHT_TAGS=$(echo "$RESPONSE" | node -e "
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync(0, 'utf-8'));
    console.log(data.response.trim());
")

echo "============================================="
echo "🤖 AI Impact Analysis Result: Running tests matching tags -> $PLAYWRIGHT_TAGS"
echo "============================================="

# 4. Запускаем Playwright только с выбранными ИИ тегами
npx playwright test --grep "$PLAYWRIGHT_TAGS"