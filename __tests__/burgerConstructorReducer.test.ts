import {
  addIngredientToConstructor,
  burgerConstructorSliceReducer,
  ingredientDown,
  ingredientUp,
  initialState,
  removeIngredientFromConstructor,
  resetConstructor,
  TBurgerConstructorSlice
} from '../src/services/slices/burgerConstructorSlice';

const bunMockData = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: '1234567890',
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
};

const ingredient1MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '1234567890',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

const ingredient2MockData = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '0987654321',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

describe('Тестирование builderReducer', () => {
  describe('Работа с булками', () => {
    test('Установка булки через addIngredient', () => {
      const state = burgerConstructorSliceReducer(
        initialState,
        addIngredientToConstructor(bunMockData)
      );

      // Объект букли в сторе и установленный вручную совпадают
      expect(state.constructorBun).toEqual(bunMockData);
      // Остальные ингредиенты не изменились при добавлении только булки
      expect(state.constructorIngredients).toHaveLength(0);
    });
  });

  describe('Работа с ингридиентами', () => {
    test('Добавление ингредиента', () => {
      const state = burgerConstructorSliceReducer(
        initialState,
        addIngredientToConstructor(ingredient1MockData)
      );

      // У конструктора появился новый ингридиент
      expect(state.constructorIngredients).toHaveLength(1);

      const updatedObject = { ...state.constructorIngredients[0] } as Record<string, any>;
      delete updatedObject.id;

      const initialObject = { ...ingredient1MockData } as Record<string, any>;
      delete initialObject.id;

      expect(updatedObject).toEqual(initialObject);
      // Булка не изменилась
      expect(state.constructorBun).toBeNull();
    });

    test('Удаление ингредиента', () => {
      const _initialState = {
        constructorBun: null,
        constructorIngredients: [ingredient1MockData, ingredient2MockData]
      };

      const state = burgerConstructorSliceReducer(
        _initialState,
        removeIngredientFromConstructor(ingredient1MockData.id)
      );

      // У конструктора удалился 1 ингридиент
      expect(state.constructorIngredients).toHaveLength(1);
      expect(state.constructorIngredients[0]).toEqual(ingredient2MockData);
      // Булка не изменилась
      expect(state.constructorBun).toBeNull();
    });

    describe('Передвижение ингредиентов', () => {
      test('Передвижение вниз', () => {
        const _initialState = {
          constructorBun: null,
          constructorIngredients: [ingredient1MockData, ingredient2MockData]
        };

        const state = burgerConstructorSliceReducer(
          _initialState,
          ingredientDown(ingredient1MockData.id)
        );

        // У конструктора сменилась позиция ингредиентов
        expect(state.constructorIngredients).toHaveLength(2);
        expect(state.constructorIngredients[0]).toEqual(ingredient2MockData);
        expect(state.constructorIngredients[1]).toEqual(ingredient1MockData);
        // Булка не изменилась
        expect(state.constructorBun).toBeNull();
      });

      test('Передвижение вверх', () => {
        const _initialState = {
          constructorBun: null,
          constructorIngredients: [ingredient1MockData, ingredient2MockData]
        };

        const state = burgerConstructorSliceReducer(
          _initialState,
          ingredientUp(ingredient2MockData.id)
        );

        // У конструктора сменилась позиция ингредиентов
        expect(state.constructorIngredients).toHaveLength(2);
        expect(state.constructorIngredients[0]).toEqual(ingredient2MockData);
        expect(state.constructorIngredients[1]).toEqual(ingredient1MockData);
        // Булка не изменилась
        expect(state.constructorBun).toBeNull();
      });
    });
  });

  test('Очистка конструктора', () => {
    const _initialState: TBurgerConstructorSlice = {
      constructorBun: bunMockData,
      constructorIngredients: [ingredient1MockData, ingredient2MockData]
    };

    const state = burgerConstructorSliceReducer(
      _initialState,
      resetConstructor()
    );

    // Конструктор очистился
    expect(state.constructorIngredients).toHaveLength(0);
    expect(state.constructorBun).toBeNull();
  });
});
