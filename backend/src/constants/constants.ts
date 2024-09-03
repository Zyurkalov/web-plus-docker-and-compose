export const minLength_password = 2;
export const minLength = 1;
export const maxLength_username = 64;
export const maxLength_about = 200;
export const maxLength_wishname = 250;
export const maxLength_description = 1024;
export const maxLength_wishList = 1500;

// export const EMAIL_REGEXP = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;
// export const URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const EMAIL_REGEXP =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]{2,}$/;
export const URL_REGEXP =
  /^(https?:\/\/)?(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/;

export const DEFAULT_VALUES = {
  about: 'Пока ничего не рассказал о себе',
  avatar: 'https://i.pravatar.cc/300',
  image:
    'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  email: 'user@yandex.ru',
  password: 'somestrongpassword',
  user: 'user',
};

export const MAP_ERRORS = {
  notFound: {
    statusCode: 404,
    message: 'Объект не найден',
  },
  default: {
    statusCode: 500,
    message: 'Ошибка сервера',
  },
  userAlreadyExists: {
    statusCode: 409,
    message: 'Пользователь с таким email или username уже зарегистрирован',
  },
  invalidCredentials: {
    statusCode: 401,
    message: 'Некорректная пара логин и пароль',
  },
  validationError: {
    statusCode: 400,
    message: 'Ошибка валидации переданных значений',
  },
  unauthorized: {
    statusCode: 401,
    message: 'Необходима аутентификация',
  },
};

export const MAP_EXCEPTION_TEXT = {
  itsNull: 'Объект не существует',
  user: {
    alreadyExists: 'Пользователь с таким email или username уже существует',
  },
  wish: {
    alreadyExists: 'У вас уже есть этот подарок',
    notOwn: 'Вы можете менять и удалять только собственные пожелания',
    raisedNotNull: 'Нельзя удалить когда у подарка уже есть спонсоры',
  },
  wishlist: {
    notOwn: 'Вы можете менять и удалять только собственные вишлисты',
  },
  offer: {
    itsOwn: 'Себе подарок спонсировать нелья',
    overprice: 'Указанная сумма превышает стоимость',
    close: 'Сбор на подарок уже закрыт',
  },
};

export const MAP_PATH = {
  auth: 'auth',
  wishes: 'wishes',
  wishlist: 'wishlistlists',
  users: 'users',
  offers: 'offers',
};
