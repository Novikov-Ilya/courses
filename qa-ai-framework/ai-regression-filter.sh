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

# 2. Модифицированный промпт с учетом расширенной матрицы тегов
PROMPT="You are a strict CI/CD Test Selection Automation Agent. 
Analyze these changed files in a React project:
$CHANGED_FILES

You MUST choose and return EXACTLY ONE or TWO tags from the allowed list below that best match the modified files.

ALLOWED TAGS:
- @ui (Use if CSS, layout, placeholders, HTML tags, links, or styles are changed)
- @validation (Use if validation hooks, useFormValidate, inputError, length checks, or onBlur/onChange logic are changed)
- @auth (Use if submithForm, API contracts, status codes 201/401, or logIn methods are changed)
- @security (Use if XSS containers, sanitization, rapid clicks, or race conditions are changed)
- @smoke (Use ONLY if multiple unrelated modules are changed at once or global config files are modified)

CRITICAL EXAMPLES FOR TRAINING:
Example 1: If changed files contains 'useFormValidate.ts' -> output strictly: @validation
Example 2: If changed files contains 'Login.tsx' link updates -> output strictly: @ui
Example 3: If changed files contains 'submitForm' API modifications -> output strictly: @auth

Rules:
1. Do not use your imagination. Match the filename directly with the ALLOWED TAGS.
2. Return ONLY the raw tag string (e.g., '@validation' or '@ui'). 
3. No explanations, no markdown formatting, no preamble, no backticks. Just the raw text."

# 3. Запрос к локальной Ollama API
RESPONSE=$(curl -s http://localhost:11434/api/generate -d "{
  \"model\": \"qwen3.5:9b\",
  \"prompt\": \"$PROMPT\",
  \"stream\": false
}")

# Извлекаем текст ответа ИИ с безопасным фолбэком
PLAYWRIGHT_TAGS=$(echo "$RESPONSE" | node -e "
    const fs = require('fs');
    try {
      const data = JSON.parse(fs.readFileSync(0, 'utf-8'));
      console.log(data.response.trim());
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
