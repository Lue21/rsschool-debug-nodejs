# rsschool-debug-nodejs
Debug in Node.js

self-esteem:

Найденные ошибки компиляции

<описание ошибки>. <описание исправления>. Исправлена(ы) строка(и) <номер(а) строк> в файле <относительный путь к файлу из корневой папки> ...

1. ReferenceError: Router is not defined - Вызов необъявленной функции Router() в строке 1 файла 'usercontroller.js'
Был подключен модуль 'express' для вызова функции Router()
Исправлена строка 1 в файле 'usercontroller.js' - стало "require('express').Router();"

2. Error: Cannot find module 'bcrypt' - Не найден модуль 'bcrypt' в строке 2 файла 'usercontroller.js'
Была выполнена установка модуля 'bcrypt'

3. TypeError: require(...).import is not a function - Обращение к неизвестной import в строке 5 файла 'usercontroller.js'
Был выполнен экспорт объекта sequelize из модуля 'db.js'
Добавлена строка "module.exports = sequelize;" в конец файла 'db.js'

4. SyntaxError: Function statements require a function name - объявление функции без имени в строке 1 файла 'game.js'
Функция была объявлена как экспортируемая из модуля 'game.js'
Исправлена строка 1 в файле 'game.js' - стало "module.exports = function(sequelize, DataTypes) {"

5. ReferenceError: routers is not defined - экспорт неопределенной переменной routers в строке 116 файла 'gamecontroller.js'
Было исправлено имя экспортируемого объекта в модуле 'gamecontroller.js'
Исправлена строка 116 в файле 'gamecontroller.js'  стало "module.exports = router;"

6. TypeError: require(...).import is not a function - вызов неопределенной функции в строке 2 файла 'validate-session.js'
Вместо модуля 'sequelize' подключен локальный 'db.js'
Исправлена строка 2 в файле 'validate-session.js' - стало "var User = require('../db').import('../models/user');"



Найденные ошибки логики приложения

<описание ошибки>. <описание исправления>. Исправлена(ы) строка(и) <номер(а) строк> в файле <относительный путь к файлу из корневой папки> ...

1. Не задан порт доступа к БД
Добавлен параметр 'DB_PORT' в файл '.env' - "DB_PORT=5433"
Добавлена строка в позицию 10 файла 'db.js' инициализации объекта 'sequelize' - "port: process.env.DB_PORT,"

2. Не задан порт соединения при запуске сервера Express  в файле 'app.js'
Добавлен параметр 'APP_PORT' в файл '.env' - "APP_PORT=4000"
Исправлена строка 13 в файле 'app.js' - "app.listen(process.env.APP_PORT, function() {"

3. Не вызывается функция sequelize.authenticate() в файле 'db.js' строка 15
Выполена переустановка пакета 'pg'

4. Не подключен парсер JSON даных из body запроса в файле 'app.js'
Вместо строки "app.use(require('body-parser'));"  добавлены строки 
10 - "app.use(express.urlencoded({extended: false}));"
11 - "app.use(express.json());"

5. Создается неописанное свойство 'passwordhash' для объекта 'User' в файле 'usercontroller.js' - для объекта описано свойство 'passwordHash' в файле 'user.js'
Исправлена строка 11 в файле 'usercontroller.js' - "passwordHash: bcrypt.hashSync(req.body.user.password, 10),"

6. Unhandled rejection ReferenceError: games is not defined - обращение к необъявленной переменной 'games' в строке 9 файла 'gamecontroller.js'
Было исправлено имя передаваемого параметра функции 'findSuccess(data)' на 'games'
Исправлена строка 7 в файле 'gamecontroller.js' - "function findSuccess(games) {"

7. TypeError: Cannot read property 'id' of undefined - обращение к несуществующей переменной 'id' в строке 42 файла 'gamecontroller.js'
Было исправлено имя считываемого параметра 'req.body.user.id' на 'req.user.id'
Исправлена строка 42 в файле 'gamecontroller.js' - "owner_id: req.user.id,"

8. Неверный синтаксис для типа integer: \"[object SequelizeInstance:user]\ - передача параметра запроса неверного типа в строке 73 айла 'gamecontroller.js'
Был исправлено имя передаваемого параметра 'req.user' на 'req.user.id'
Исправлена строка 73 в файле 'gamecontroller.js' - "owner_id: req.user.id"


Рефактор кода

<Описание, что было изменено>

1. Замена объявлений создания переменных с 'var' на 'const' или 'let'
2. Замена объявлений функций на анонимные стрелочные, там где это допускается логикой работы приложения
3. Добавления блока '.catch()' к строке синхронизации с БД (строка 8 в файле 'app.js')
