import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
// import {
//   check,
//   confirm_registration,
//   delete_device,
//   get_devices,
//   refresh,
//   refresh_token,
//   removeAccessToken,
//   saveAccessToken,
//   send_code,
//   signIn,
//   signOut,
//   signUp,
//   sign_2fa,
//   signup,
// } from '../api/auth/auth';

export const registerUser = createAsyncThunk('user/registerUser', async (userRegisterData) => {
  try {
    const req = await signup(userRegisterData.login, userRegisterData.password);
    console.log(req, 'req');
    if (req.status !== 200) {
      setError('user with this credential already exists');
      throw new Error(`Request failed with status code ${req.status}, ${await req.data}`);
    }
    return req.data;
  } catch (error) {
    console.error(`Register error: ${error}`);
    return false;
  }
});

export const verifyUser = createAsyncThunk('user/verifyUser', async (token) => {
  try {
    const req = await confirm_registration(token);
    if (req.status !== 200) {
      throw new Error(`Request failed with status code ${req.status}, ${await req.data}`);
    }
    saveAccessToken(req.data);
    return req.data;
  } catch (error) {
    console.log(`Register verify error: ${error}`);
    return null;
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (userCredentials) => {
  try {
    const req = await signin(
      userCredentials.login,
      userCredentials.password,
      userCredentials.remember,
    );
    if (req.status !== 200) {
      throw new Error(`Request failed with status code ${req.status}, ${await req.data}`);
    }
    if (req.data.token_2fa) {
      localStorage.setItem('token_2fa', req.data.token_2fa);
      console.log('token 2fa: ', req.data.token_2fa);
    } else {
      saveAccessToken(req.data);
      console.log('access token: ', req.data.access_token);
    }
    return req.data;
  } catch (error) {
    throw error;
  }
});

export const sendCode2FA = createAsyncThunk('user/sendCode2FA', async () => {
  const token_2fa = localStorage.getItem('token_2fa');
  try {
    const req = await send_code(token_2fa);
    if (req.status !== 200) {
      throw new Error(`Request failed with status code ${req.status}, ${await req.data}`);
    }
    return true;
  } catch (error) {
    console.error('Error in 2FA login request', error);
    return false;
  }
});

export const verifyCode2FA = createAsyncThunk('user/verifyCode2FA', async (code) => {
  const token2FA = localStorage.getItem('token_2fa');
  try {
    const req = await sign_2fa(token2FA, code);
    if (req.status !== 200) {
      throw new Error(`Request failed with status code ${req.status}, ${await req.data}`);
    }
    saveAccessToken(req.data);
    console.log('access token: ', req.data.access_token);
    return req.data;
  } catch (error) {
    console.log(error, 'catch');
    return null;
  }
});

export const validateAccessToken = () => (dispatch, getState) => {
  const userToken = localStorage.getItem('user');
  const TwoFactorToken = localStorage.getItem('token_2fa');
  if (userToken || TwoFactorToken) {
    try {
      dispatch(userSlice.actions.checkAuth());
    } catch (error) {
      localStorage.removeItem('user');
      dispatch(userSlice.actions.checkAuth());
    }
  }
};

export const setToken2FA = createAsyncThunk('user/setToken2FA', async (token2FA) => {
  return token2FA;
});

export const setSubscribersData = (data) => ({
  type: 'user/setSubscribersData',
  payload: data,
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    loading: true,
    user: null,
    error: null,
    email: '',
    token2FA: null,
    subscribersData: [],
    selectedOption: 'Year',
    activeTab: 'emails',
  },
  reducers: {
    checkAuth: (state) => {
      const userToken = localStorage.getItem('user');
      const TwoFactorToken = localStorage.getItem('token_2fa');
      if (userToken || TwoFactorToken) {
        state.isLogged = true;
        state.token2FA = TwoFactorToken;
      }
    },
    toggleTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    setSubscribersData: (state, action) => {
      state.subscribersData = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        state.isLogged = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLogged = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isLogged = false;
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid credentials.';
        }
      })
      .addCase(sendCode2FA.fulfilled, (state, action) => {
        state.token2FA = action.payload;
      })
      .addCase(sendCode2FA.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(verifyCode2FA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCode2FA.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(verifyCode2FA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userSlice.actions.checkAuth, (state) => {
        const userToken = localStorage.getItem('user');
        if (userToken) {
          state.isLogged = true;
        } else {
          state.isLogged = false;
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.error = null;
        } else {
          state.user = null;
          state.error = 'Registration failed. User already exists.';
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message || 'Registration failed';
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Something goes wrong with register';
        }
      });
  },
});

export const {
  checkAuth,
  setEmail,
  clearEmail,
  setSelectedOption,
  setUserEmail,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
