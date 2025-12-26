#  News Platform — Monorepo (Web + Mobile)

- **Web-версия** (Next.js + TypeScript)  
- **Mobile-версия** (React Native + Expo / bare RN)

#  1. Что нужно установить перед запуском

Чтобы проект запустился, необходимо установить:

###  Node.js (версия 18 или новее)
Скачать можно здесь:  
https://nodejs.org/

###  pnpm (менеджер пакетов)
Устанавливается одной командой:
npm install -g pnpm

- Почему pnpm?
Потому что он корректно работает с монорепозиториями и устанавливает зависимости быстрее, чем npm.

- Git (понятно)
- Для Mobile-версии дополнительно:
Android Studio → https://developer.android.com/studio

Настроить Android SDK

Создать виртуальный телефон (AVD) или подключить физический телефон

Убедиться, что команды доступны:
adb devices
Если устройство отображается — всё нормально.

#  2. Установка зависимостей
Откройте терминал в корневой папке проекта и выполните:
pnpm install
Эта команда автоматически установит зависимости:
- для Web (packages/web)
- для Mobile (packages/mobile)

Если вдруг не всё установилось — можно принудительно доустановить:
pnpm install --filter web
pnpm install --filter mobile

#  3. Запуск Web-версии (Next.js)
Перейдите в каталог Web:
cd packages/web

Запустите дев-режим:
pnpm dev
После запуска вы увидите сообщение:
Local: http://localhost:3000
Откройте эту ссылку в браузере — web-версия готова.

#  Возможные проблемы при запуске Web
- "Module not found"
Решение — доустановите зависимости:
pnpm install

- "API key is missing"
Для API нужен файл .env:
Создайте файл:
packages/web/.env
Добавьте туда:
NEWS_API_KEY=your_api_key_here

Если API-ключа нет — Web всё равно запустится, используется mock-fallback.

##  Деплой (Vercel)

Web-версия доступна онлайн:
https://news-app-nextjs-ywec.vercel.app/

Если проект не запускается локально — можно посмотреть рабочий прод на Vercel.


#  4. Запуск Mobile-версии (React Native)
Перейдите в мобильную папку:
cd packages/mobile
Установите зависимости (если нужно):
pnpm install

# ▶ Запуск Metro Bundler (обязательно)
pnpm start

Откроется окно Metro. Теперь вы можете выбрать:
a — запустить Android-эмулятор
r — перезапустить приложение
q — выйти

Или вручную запустить:
pnpm run android
После запуска приложение откроется на виртуальном или реальном телефоне.

#  Возможные ошибки Mobile
- ANDROID_HOME not set
Нужно открыть Android Studio → SDK Manager → скопировать путь SDK.

Добавить в системные переменные:
ANDROID_HOME=C:\Users\Имя\AppData\Local\Android\Sdk

- Эмулятор не запускается
Открой Android Studio → Device Manager → Start AVD вручную.

- Ошибка “Cannot find module ‘expo’” или “metro cannot resolve module”
Выполнить:
pnpm install
pnpm start --reset-cache

# Структура проекта
.
├── package.json           # Общий конфиг монорепы
├── packages/
│   ├── web/               # Web-приложение (Next.js)
│   ├── mobile/            # Mobile-приложение (React Native)
│   └── admin/ (опционально)
├── node_modules/
└── README.md

#  5. Проверка, что всё работает
Web:
сайт открывается на http://localhost:3000
- новости отображаются
- API работает через прокси-роут

Mobile:
- приложение открывается
- показывает список новостей

навигация и UI работают

# Если что-то не работает
Чаще всего повторная установка зависимостей решает проблему:
pnpm install

Если не помогло — удалите node_modules по пакетам:
rm -rf node_modules
rm -rf packages/*/node_modules
pnpm install

#  Готово!
Теперь вы можете запускать и тестировать обе версии новостного приложения.
Если возникнут сложные ошибки — смотрите README внутри каждой папки (packages/web/README.md, packages/mobile/README.md).

Удачной разработки!
