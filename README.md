# Тестовое задание
## Техническое задание
### Базовая часть
- По центру начального экрана располагается кнопка регистрации как на макете
(страница desktop полотно Desktop 1).
- После нажатия на кнопку появляется модальное окно (страница desktop
полотно Desktop 2). При желании можно добавить эффект появления на
усмотрение работника.
- Состояния всех полей есть на отдельных страницах документа. Если каких то
состояний не хватает, их нужно добавить, по возможности в стилистике
имеющимися состояний.
- После нажатия на крестик в правом верхнем углу, форма закрывается, а уже
заполненные данные удаляются.
- Кнопка зарегистрироваться модального окна не активна до тех пор пока все
поля формы не заполнены верно.
- При нажатии на кнопку зарегистрироваться модального окна:
  - Страница не перезагружается;
  - Данные из формы собираются в json и выводятся в консоль браузера;
  - Модальное окно закрывается, а кнопка открывающая модальное окно становится зелёной и неактивной.
- Валидация полей реализована согласно ТЗ.

### Валидация полей:
- Все поля указанные в макете обязательные.
- Текст ошибки должен явно говорить что пользователь сделал не верно.
- Ошибку стоит выводить после того как пользователь перестал заполнять поле, а скрывать ошибку как только она была исправлена.
- E-mail должен быть валидным адресом электронной почты.
- Никнейм может содержать только:
  - От 3 до 40 символов
  - Латинские буквы
  - Цифры
  - Символ подчёркивания (_)
- Никнейм может начинаться только с буквы.
- Никнейм содержит;
- Пароль должен содержать:
  - От 6 до 32 символов
  - Минимум по одной заглавной и строчной букве
  - Минимум одну цифру
- Пароль не должен совпадать с ником или почтовым адресом
- 10 На макете под полем пароля есть требования к паролю. По умолчанию все
правила в состоянии default. Как только какое то из условий выполняется, оно
переходит в состояние ok. Если после того как условие единожды было
выполненным перестаёт быть верным - условие переходит в состояние error.
На пример:
  - Пользователь только зашел на страницу и открыл модалку - все правила серого цвета.
  - Пользователь начал вводить пароль и ввёл только одну маленькую букву - ничего не поменялось.
  - Если стереть эту букву тоже ничего не должно меняться.
  - Если к одной маленькой букве дописать одну большую, то правило на то, что пароль содержит одну маленькую и одну большую буквы выполнено и становится зелёным, а остальные по прежнему серые.
  - Если к двум буквам добавить цифру то будет верно уже два правила и они станут зелёными.
  - Если удалить одну из букв то правило о буквах перестанет быть верным и оно должно стать красным. Правило на длину пароля по прежнему серое, а т.к. цифра по прежнему есть в пароле то правило на цифру всё ещё зелёное.
  - Если ввести валидный пароль, то все правила должны быть в состоянии ok, если после этого удалить пароль, все правила должны покраснеть.
- По умолчанию галочка около условий пользовательского соглашения не стоит, но она обязательна для заполнения пользователем.
- Слова Пользовательского соглашения - это ссылка которая ведёт на отдельную страницу. Саму страницу верстать не надо.

### Дополнительная часть
- Дополнить форму регистрации вторым шагом (на первом экране кнопку зарегистрироваться поменять на кнопку далее).
- Кнопка далее первого шага модального окна не активна до тех пор пока все поля первого шага формы не заполнены верно.
- На втором шаге размести не обязательные для заполнения поля:
  - Выбор пола (М/Ж) в виде полей с типом radio;
  - Выбор уровня образования в виде выпадающего списка.
  - Поле рассказать о себе;
  - Выбор рубрик на которые хочет подписаться новый пользователь (можно взять рубрики с федерального сайта МК - политика, экономика, происшествия...) в виде checkbox-ов;
- После всех полей второго шага размещается кнопка зарегистрироваться, по нажатию на которую происходит всё то что описано в шестом пункте базовой части.
- Дизайн второго шага регистрации должен быть на первый.