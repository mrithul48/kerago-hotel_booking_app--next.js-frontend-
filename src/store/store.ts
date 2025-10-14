import {configureStore} from '@reduxjs/toolkit'
import { cartReducer } from './slice/cartSlice';
import { filterReducer } from './slice/filterSlice';
import { PriceReducer } from './slice/priceSlice';
import { HotelReducer } from './slice/hotelSlice';

export const store = configureStore({
    reducer:{
       cart:cartReducer,
       filter:filterReducer,
       price:PriceReducer,
       hotel:HotelReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;