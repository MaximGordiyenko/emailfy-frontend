import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import campaignReducer from './campaignSlice';
import fileReducer from './fileSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    campaign: campaignReducer,
    file: fileReducer,
  },
});

export default store;
