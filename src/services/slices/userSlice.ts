import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TAuthResponse,
  updateUserApi
} from '@api';
import { TOrder } from '@utils-types';

export const initialState: Pick<TAuthResponse, 'user' | 'success'> & {
  orders: TOrder[];
  lastOrder: TOrder | null;
  orderRequestData: boolean;
  loading: boolean;
} = {
  success: false,
  user: {
    email: '',
    name: ''
  },
  orders: [],
  lastOrder: null,
  orderRequestData: false,
  loading: false
};

export const fetchUser = createAsyncThunk('user/fetchUser', getUserApi);

export const login = createAsyncThunk('user/loginUser', loginUserApi);

export const register = createAsyncThunk('user/register', registerUserApi);

export const updateUser = createAsyncThunk(
  'user/updateUserData',
  updateUserApi
);

export const logout = createAsyncThunk('user/logout', logoutApi);

export const fetchUserOrders = createAsyncThunk(
  'user/fetchUserOrders',
  async () => getOrdersApi()
);

export const newUserOrder = createAsyncThunk(
  'user/newUserOrder',
  orderBurgerApi
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginSuccess: (state, action) => {
      state.success = action.payload;
    },
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload.user;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = false;
        state.user = initialState.user;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(newUserOrder.pending, (state) => {
        state.loading = true;
        state.orderRequestData = true;
      })
      .addCase(newUserOrder.rejected, (state) => {
        state.loading = false;
        state.orderRequestData = false;
      })
      .addCase(newUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order);
        state.lastOrder = action.payload.order;
        state.orderRequestData = false;
      });
  }
});

export const { setLoginSuccess, setLastOrder } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
