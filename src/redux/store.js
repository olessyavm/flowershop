import { configureStore } from '@reduxjs/toolkit';
import flowers from './flowerSlice';
import cart from './cartSlice'

export const store = configureStore({
    reducer: {
        flowers,
        cart
    }
  })