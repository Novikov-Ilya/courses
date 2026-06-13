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
PROMPT="You are a CI/CD Test Selection Agent. Given the following modified files in a React project:
$CHANGED_FILES

Our Playwright test suite has a granular tagging system structured inside describe blocks:
- @login (Global login module identifier)
- @ui (Layout, initial structural states, rendering placeholders)
- @navigation (SPA routing paths, route access pathways, link integrity)
- @validation (Forms validation, field blur sequences, error states)
- @state (Active data bindings, client-side boundary interceptions)
- @auth (Authentication flows, positive/negative API response scenarios)
- @regression (Core functional regression contract handlers)
- @security (Defensive risk assessments, XSS sanitization, race conditions)
- @asynchrony (Inflight state mutations, async network speed drops)
- @smoke (Critical path sanity scenarios across blocks)

Determine the most accurate and narrow logical combination of test tags that MUST be executed based on the code changes (e.g. '@validation|@state' or '@ui|@navigation'). If changes are highly critical or broad, return '@smoke' or '@login'. 
Return ONLY the tags separated by OR operator for Playwright (e.g. '@ui|@validation'). Do not write any explanations, code blocks, or preamble. Just the raw string."

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
