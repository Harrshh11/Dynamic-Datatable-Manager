import { configureStore } from '@reduxjs/toolkit';
import columnsReducer from './columnsSlice';
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    columns: columnsReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
