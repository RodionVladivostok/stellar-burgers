import {
  initialState,
  fetchIngredients
} from '../src/services/slices/ingridientsSlice';
import { ingredientsSliceReducer } from '../src/services/slices/ingridientsSlice';

const ingredientsMockData = {
  data: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    }
  ],
  success: true
};

describe('Тестирование ingredientsReducer', () => {
  describe('Асинхронная функция для получения ингридиентов: fetchIngredients', () => {
    test('Начало запроса: fetchIngredients.pending', () => {
      const state = ingredientsSliceReducer(
        initialState,
        fetchIngredients.pending('pending')
      );

      expect(state.isIngredientsLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат запроса: fetchIngredients.fulfilled', () => {
      const state = ingredientsSliceReducer(
        initialState,
        fetchIngredients.fulfilled(ingredientsMockData, 'fulfilled')
      );

      expect(state.isIngredientsLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(ingredientsMockData.data);
    });

    test('Ошибка запроса: fetchIngredients.rejected', () => {
      const error = 'fetchIngredients.rejected';

      const state = ingredientsSliceReducer(
        initialState,
        fetchIngredients.rejected(new Error(error), 'rejected')
      );

      expect(state.isIngredientsLoading).toBeFalsy();
      expect(state.error).toEqual(error);
    });
  });
});
