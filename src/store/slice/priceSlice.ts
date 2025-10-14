import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceState{
    price:number;
}


const initialState:PriceState ={
    price:1000
}

export const priceSlice = createSlice({
    name:"price",
    initialState,
    reducers:{
        updatePrice:(state,action:PayloadAction<number>)=>{
          state.price = action.payload;
        }
    }
})

export const {updatePrice} = priceSlice.actions;
export const {reducer:PriceReducer} = priceSlice