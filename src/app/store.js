import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import mailReducer from '../features/replySlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    mail: mailReducer
  },
});
