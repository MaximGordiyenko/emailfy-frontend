/*
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp, getRefreshToken } from '../api/auth/auth.js';

export const registerAccount = createAsyncThunk(
  'account/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signUp(credentials.email, credentials.password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginAccount = createAsyncThunk(
  'account/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signIn(credentials.email, credentials.password, credentials.remember);
      sessionStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// Refresh access token when expired
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  try {
    const response = await getRefreshToken();
    sessionStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: null,
    token: sessionStorage.getItem('accessToken') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAccount.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
      })
      .addCase(registerAccount.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAccount.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.accessToken;
      })
      .addCase(loginAccount.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
      });
  },
});

export const { logout } = accountSlice.actions;
export default accountSlice.reducer;
*/
