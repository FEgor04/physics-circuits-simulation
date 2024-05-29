# Circuisim Project

[![Backend](https://github.com/FEgor04/physics-circuits-simulation/actions/workflows/backend.yml/badge.svg)](https://github.com/FEgor04/physics-circuits-simulation/actions/workflows/backend.yml)
[![Frontend](https://github.com/FEgor04/physics-circuits-simulation/actions/workflows/frontend.yml/badge.svg)](https://github.com/FEgor04/physics-circuits-simulation/actions/workflows/frontend.yml)

Проект circuisim позволяет вам создавать схемы в онлайн-платформе и делиться ими с друзьями, студентами или знакомыми

## Возможности
- Создание схем
- Запуск схемы в режиме симуляции
- Редактирование и просмотр схем с коллегами
- Встраивание схемы на другие сайты
-  ~~Одновременное редактирование схем~~

## Стэк

- Postgres в качестве БД
- Деплой в Docker, Traefik в качестве reverse proxy
- Бэк: Java, Spring Boot, Gradle
- Фронт: React, TypeScript, React Query, Tailwind CSS, shadcn/ui

## Инструкция по запуску
```bash
docker compose up --build
```
Собирает приложение в Docker-образ,
запускает front на 80-м порту, back на 8080,
PostgreSQL - на 5432

## Над проектом работали
1. Егор Федоров
2. Андрей Карабанов
3. Азат Сиразетдинов
4. Денис Бермас
5. Егор Деревягин


