import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export type TIngredientsSlice = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error?: string | null;
};

export const initialState: TIngredientsSlice = {
  ingredients: [],
  isIngredientsLoading: true,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = null;
        state.ingredients = action.payload.data;
      });
  }
});

export const ingredientsSliceReducer = ingredientsSlice.reducer;
