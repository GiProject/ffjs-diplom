1. Склонировать репозиторий.
2. Скопировать файл `./backend/.env-example` и переименовать в `./backend/.env`
3. Заполнить значения в `./backend/.env`(пример данных ниже)
4. Запустить сборку командой `docker-compose up -d`
5. После успешной сборки запустить команду `docker exec backend_nestjs npm run init:users` чтобы создать пользователей admin и manager

Приложение будет доступно по адресу http://localhost:3003, api http://localhost:3002, база данные http://localhost:27017

Пример данных для .env
```
MONGO_URL=mongodb://mongo:27017/booking
APP_SALT=10

MANAGER_EMAIL=manager@test.ru
MANAGER_PASS=12345
MANAGER_NAME=manager
MANAGER_PHONE=78921234325

ADMIN_EMAIL=admin@test.ru
ADMIN_PASS=12345
ADMIN_NAME=admin
ADMIN_PHONE=78921234325
```
