# "Купи-подари-дай"

> Больше не нужно писать письма Деду Морозу / Санте / Гринчу! <br>
Можно воспользоваться сервисом "Купи-подари-дай" и оставить нужное пожелание, где каждый пользователь может сделать вклад в осуществления вашей мечты! Нужно только убедить всех, что "Go Cam Pro Ultra 4k Sport" вам действительно очень нужна. <br>
>
> Либо вы сами можете побыть Дедом Морозом и осуществить чью-то мечту. Даже не придется ждать Нового Года, сервис доступен все 12 месяцев в году!

### Для тестирования функционала:
- сервис доступен по адресу: [zyurkalov.docker-proj.nomorepartiesco.ru](https://zyurkalov.docker-proj.nomorepartiesco.ru/)
- адрес бекенда: [api.zyurkalov.docker-proj.nomorepartiesco.ru](https://api.zyurkalov.docker-proj.nomorepartiesco.ru/)

### Для разворачивания в локальной сети:
- склонируйте репозитории: `git clone git@github.com:Zyurkalov/web-plus-docker-and-compose.git`
- создайте файл .env и затем скопируйте в него содержимое из .env.example
- если есть Docker:
  - запустите Docker сборщик: docker-compose up  
- если Docker отсутствует:
  - перейдите в папки frontend и backend (операции нужно повторить в каждой папке):
    - установите зависимости: npm install
    - введите npm run start (или другую команду из package.json)
