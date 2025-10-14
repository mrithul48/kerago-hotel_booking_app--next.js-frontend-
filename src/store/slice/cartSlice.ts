import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface CartItems {
  image: string;
  title: string;
  place: string;
  rating: string;
}
interface CartState {
  items: CartItems[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers:{
    addToCart :(state,action:PayloadAction<CartItems>)=>{
         state.items.push(action.payload)
    },
    removeCart:(state,action:PayloadAction<string>)=>{
     state.items = state.items.filter(i=>i.title !== action.payload)
    }
  }
});

export const {addToCart,removeCart} = cartSlice.actions
export const {reducer:cartReducer} = cartSlice
