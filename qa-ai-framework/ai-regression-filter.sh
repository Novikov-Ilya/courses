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

# 2. Чистый, гибкий и масштабируемый промпт без хардкода файлов
PROMPT="You are an expert CI/CD Test Selection Agent. 
Analyze the following modified file paths from a Git commit:
$CHANGED_FILES

Your task is to classify these changes and select EXACTLY ONE testing tag from the allowed list below. 
Base your decision on the architectural scope and semantic meaning of the file names and paths.

ALLOWED TAGS & ARCHITECTURAL SCOPES:
- @ui: Select if changes affect the Presentation Layer, visual styling, JSX/TSX layout rendering, DOM structure, component design systems, static content translations (i18n), design tokens, links, or CSS/Styled-components.
- @validation: Select if changes affect Data Entry Management, form states, client-side input validations, field-level constraint checkers (length, regex matches), interactive state hooks (e.g., input handlers, useForm hooks), focus/blur life-cycle triggers, or local component error state reflections.
- @auth: Select if changes affect the Network/Data Access Layer, API communication infrastructure (Axios, Fetch, query hooks), authorization/authentication routing guards, session lifecycle tokens, HTTP response interceptors, endpoint contract definitions, or async form submission handlers.
- @security: Select if changes modify Defensive Architecture mechanisms, request rate limiting, input sanitization helpers (XSS/SQLi mitigations), concurrent asynchronous protection gates (e.g., button debouncers, double-submission locks, request cancellation patterns), or cryptographic handlers.
- @smoke: Select ONLY as a safe fallback if changes alter global infrastructure configurations (e.g., package.json, vite.config, playwright.config, CI/CD workflows, tsconfig) or modify multiple tightly coupled core business domains at the same time.

Requirements:
1. Act purely as a classifier. Do not explain your choice.
2. You MUST respond with a valid JSON object matching this exact structure: {\"tag\": \"@tagname\"}"

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
