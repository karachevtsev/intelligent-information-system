# Clients api endpoints

## Розділ "Мої дані"

- **Особисті дані** - https://api.dtkt.ua/clients/profile
- **Редагування особистих даних**:
    - Оновити особисті дані - POST, https://api.dtkt.ua/clients/profile
    - Оновити аватар - POST, https://api.dtkt.ua/clients/avatar
    - Видалити аватар - DELETE, https://api.dtkt.ua/clients/avatar
    - Змінити пошту - POST, https://api.dtkt.ua/clients/email (need confirmation page)
    - Змінити пароль - POST, https://api.dtkt.ua/clients/password (need confirmation page)
- **Моя передплата**
    - Список передплат - https://api.dtkt.ua/shop4/
- **Мої замовлення**
    - Список замовлень - https://api.dtkt.ua/shop4/orders
    - Завантажити рахунок - https://api.dtkt.ua/shop4/orders/${id}/download
- **Персональні повідомлення**
    - Список повідомленнь - https://api.dtkt.ua/clients/notifications/,
    - Прочитати повідомлення - POST, https://api.dtkt.ua/clients/notifications/${id}/read
    - Видалити повідомлення - POST, https://api.dtkt.ua/clients/notifications/${id}/

## Розділ "Моє обране"

- Статті - https://api.dtkt.ua/online/favorite
- Новини - https://api.dtkt.ua/news/favorite
- Довідники - https://api.dtkt.ua/services/favorite
- Консультації - https://api.dtkt.ua/consulting/favorite
- Документи - https://api.dtkt.ua/documents/favorite
- Бланки - https://api.dtkt.ua/blanks/favorite
- Вебінари - https://api.dtkt.ua/webinars/favorite
- Коментарі - https://api.dtkt.ua/dtkt/my-comments

## Розділ "Мої сервіси"

- Запитання до редакції
- Email розсилки
- Звітність з «СОТА»
- Сайт без реклами
- Паперовий журнал

## Сторінки підтвердження