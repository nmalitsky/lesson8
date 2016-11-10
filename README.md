Так как работа в чате с комнатами не описана жестко, то реализован следующий механизм:
пользователи получают сообщения только для их текущего расположения - если зашел в комнату, 
то только адресованные для комнаты, ecли в общем чате - то для него. 
Пользователь всегда может перейти из комнаты в другую комнату - и будет получать только ее сообщения. 
Пользователь всегда может единовременно находиться в одном месте (конкретная комната, общий чат).
При нахождении в комнате к его имени в списке сообщений добавляется префикс - название комнаты 
(например,'room1.zoro'). Сервер чата контролирует уникальность логинов подключения.

Клиент предпологает использование дев. консоли браузера, т.е. открывает по F12 консоль и там осуществляем
работу в чате. 

Например:

1) зайти на страницу чата - http://localhost:3000, в консоли будет приветствие: 
'You are connect to the chat server (open websocket) now'

2) подключиться к чату: login('zoro')

3) послать сообщение в чат (не в комнату): message('hello chat!'). Все участникам чата (не комнаты) прийдет это сообщение

4) войти в комнату: enterRoom('room1')

5) послать сообщение участникам комнаты (не в общий чат): message('hello room!'). Все участникам комнаты (не чата) прийдет это сообщение

6) выйти из комнаты (в общий чат): exitRoom()

7) выйти из чата logout()

