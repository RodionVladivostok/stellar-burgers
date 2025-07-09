import {
  fetchUser,
  login,
  logout,
  register,
  updateUser,
  userSliceReducer,
  initialState,
  newUserOrder
} from '../src/services/slices/userSlice';

const userMockData = {
  success: true,
  refreshToken: '',
  accessToken: '',
  user: {
    email: 'example@example.mail',
    name: 'Example'
  }
};

const registerMockData = {
  email: 'example@example.mail',
  name: 'Example',
  password: 'Example'
};

const loginMockData = {
  email: 'example@example.mail',
  password: 'Example'
};

const ordersMockData = {
  success: true,
  name: 'example',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '6622337897ede0001d0666b5',
    status: 'done',
    name: 'EXAMPLE_NAME',
    createdAt: '2024-04-19T09:03:52.748Z',
    updatedAt: '2024-04-19T09:03:58.057Z',
    number: 38321
  }
};

describe('Тестирование userReducer', () => {
  // Регистрация
  describe('Асинхронная функция для регистрации: register', () => {
    test('Начало запроса: register.pending', () => {
      const state = userSliceReducer(
        initialState,
        register.pending('pending', registerMockData)
      );

      expect(state.loading).toBeTruthy();
    });

    test('Результат запроса: register.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        register.fulfilled(userMockData, 'fulfilled', registerMockData)
      );

      expect(state.success).toBeTruthy();
      expect(state.loading).toBeFalsy();
      expect(state.user).toEqual(userMockData.user);
    });

    test('Ошибка запроса: register.rejected', () => {
      const error = 'register.rejected';

      const state = userSliceReducer(
        initialState,
        register.rejected(new Error(error), 'rejected', registerMockData)
      );

      expect(state.loading).toBeFalsy();
      expect(state.success).toBeFalsy();
    });
  });

  // Логин
  describe('Асинхронная функция для входа в аккаунт: login', () => {
    test('Начало запроса: login.pending', () => {
      const state = userSliceReducer(
        initialState,
        login.pending('pending', loginMockData)
      );

      expect(state.loading).toBeTruthy();
      expect(state.success).toBeFalsy();
    });

    test('Результат запроса: login.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        login.fulfilled(userMockData, 'fulfilled', loginMockData)
      );

      expect(state.success).toBeTruthy();
      expect(state.loading).toBeFalsy();
      expect(state.user).toEqual(userMockData.user);
    });

    test('Ошибка запроса: login.rejected', () => {
      const error = 'login.rejected';

      const state = userSliceReducer(
        initialState,
        login.rejected(new Error(error), 'rejected', loginMockData)
      );

      expect(state.success).toBeFalsy();
      expect(state.loading).toBeFalsy();
    });
  });

  // Выход
  describe('Асинхронная функция выхода из аккаунта: logout', () => {
    test('Результат запроса: logout.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        logout.fulfilled({ success: true }, 'fulfilled')
      );

      expect(state.loading).toBeFalsy();
      expect(state.success).toBeFalsy();
      expect(state.user).toEqual({
        email: '',
        name: ''
      });
    });
  });

  // Проверка авторизации
  describe('Асинхронная функция проверки авторизации: fetchUser', () => {
    test('Результат запроса: fetchUser.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        fetchUser.fulfilled(userMockData, 'fulfilled')
      );

      expect(state.success).toBeTruthy();
      expect(state.loading).toBeFalsy();
      expect(state.user).toEqual(userMockData.user);
    });

    test('Ошибка запроса: fetchUser.rejected', () => {
      const error = 'fetchUser.rejected';

      const state = userSliceReducer(
        initialState,
        fetchUser.rejected(new Error(error), 'rejected')
      );

      expect(state.success).toBeFalsy();
      expect(state.loading).toBeFalsy();
    });
  });

  // // Обновление информации о пользователе
  describe('Асинхронная функция редактирования информации пользователя: updateUser', () => {
    test('Результат запроса: updateUser.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        updateUser.fulfilled(userMockData, 'fulfilled', userMockData.user)
      );

      expect(state.user).toEqual(userMockData.user);
    });
  });

  describe('Асинхронная функция для создания заказа: newUserOrder', () => {
    test('Начало запроса: newUserOrder.pending', () => {
      const state = userSliceReducer(
        initialState,
        newUserOrder.pending('pending', ordersMockData.order.ingredients)
      );

      expect(state.orderRequestData).toBeTruthy();
    });

    test('Результат запроса: newUserOrder.fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        newUserOrder.fulfilled(
          ordersMockData,
          'fulfilled',
          ordersMockData.order.ingredients
        )
      );

      expect(state.orderRequestData).toBeFalsy();
      expect(state.lastOrder).toEqual(ordersMockData.order);
    });

    test('Ошибка запроса: newUserOrder.rejected', () => {
      const error = 'newUserOrder.rejected';

      const state = userSliceReducer(
        initialState,
        newUserOrder.rejected(new Error(error), 'rejected', [])
      );

      expect(state.orderRequestData).toBeFalsy();
    });
  });
});
