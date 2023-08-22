// store.ts

import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/auth/authSlice';

// Definisikan tipe RootState
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = {
  admin: adminReducer,
  user: userReducer,
  auth: authReducer,
  // ...
};

const store = configureStore({
  reducer: rootReducer,
  // ...
});

export default store;
