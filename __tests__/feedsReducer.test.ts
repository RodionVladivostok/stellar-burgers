import {
  fetchFeeds,
  getOrderByNumber,
  initialState
} from '../src/services/slices/feedsSlice';
import { feedsSliceReducer } from '../src/services/slices/feedsSlice';

const feedsMockData = {
  success: true,
  orders: [],
  total: 1,
  totalToday: 1
};

const ordersMockData = {
  orders: [
    {
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
  ],
  success: true
};

describe('Тестирование feedsSliceReducer', () => {
  describe('Асинхронная функция для получения ленты заказов: fetchFeeds', () => {
    test('Начало запроса: fetchFeeds.pending', () => {
      const state = feedsSliceReducer(
        initialState,
        fetchFeeds.pending('pending')
      );

      expect(state.loadingData).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: fetchFeeds.fulfilled', () => {
      const state = feedsSliceReducer(
        initialState,
        fetchFeeds.fulfilled(feedsMockData, 'fulfilled')
      );

      expect(state.loadingData).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(feedsMockData.orders);
      expect(state.total).toEqual(feedsMockData.total);
      expect(state.total).toEqual(feedsMockData.totalToday);
    });

    test('Ошибка запроса: fetchFeeds.rejected', () => {
      const error = 'fetchFeeds.rejected';

      const state = feedsSliceReducer(
        initialState,
        fetchFeeds.rejected(new Error(error), 'rejected')
      );

      expect(state.loadingData).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });
});

describe('Асинхронная функция для получения заказа по номеру: fetchOrder', () => {
  test('Начало запроса: fetchOrder.pending', () => {
    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.pending('pending', ordersMockData.orders[0].number)
    );

    expect(state.loadingData).toBeTruthy();
  });

  test('Результат запроса: fetchOrder.fulfilled', () => {
    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.fulfilled(
        ordersMockData,
        'fulfilled',
        ordersMockData.orders[0].number
      )
    );

    expect(state.loadingData).toBeFalsy();
  });

  test('Ошибка запроса: fetchOrder.rejected', () => {
    const error = 'fetchOrder.rejected';

    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.rejected(new Error(error), 'rejected', -1)
    );

    expect(state.loadingData).toBeFalsy();
  });
});
