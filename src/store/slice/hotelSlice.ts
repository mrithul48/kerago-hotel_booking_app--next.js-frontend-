import { Hotels } from "@/lib/utils";
import { hotelService } from "@/service/hotelService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface HotelState {
  hotel: Hotels[];
  loading: boolean;
  error: string | null;
}
const initialState: HotelState = {
  hotel: [],
  loading: false,
  error: null,
};

//----thunks----

//fetch hotel (all,id,category)
export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async ({type,value,}: {type: "all" | "id" | "category";value?: string | number;}) => {
    switch (type) {
      case "all":
        return await hotelService.getAll();
      case "id":
        console.log("is working this id case")
        return await hotelService.getById(value as number);
      case "category":
        return await hotelService.getByCategory(value as string);
      default:
        throw new Error("invalid fetch type");
    }
  }
);

//update hotel
// export const updateHotel = createAsyncThunk(
//  "hotel/update",
//  async({id,data}:{id:number; data:Partial<Hotels>})=>{
//      return await hotelService.updateHotel(id,data)
//  }
// );

//delete hotel
export const deleteHotel = createAsyncThunk(
    "hotel/delete",
    async({id}:{id:number})=>{
        return await hotelService.deleteHotel(id)
    }
)

//slice
export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
//fetch 
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotel = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch error";
      });

      //update 

      // builder
      // .addCase(updateHotel.pending,(state)=>{
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(updateHotel.fulfilled,(state,action)=>{
      //   state.loading=false;
      //   const index = state.hotel.findIndex((h)=>h.hotelId===action.payload.id);
      //   if(index!==-1){
      //       state.hotel[index] = action.payload;
      //   }else{
      //       state.hotel.push(action.payload);
      //   }
      // })
      // .addCase(updateHotel.rejected,(state,action)=>{
      //   state.loading=false;
      //   state.error=action.error.message||"failed to update hotel"
      // });

      //delete

      builder
    .addCase(deleteHotel.pending,(state)=>{
       state.loading=true;
       state.error=null;
    })
    .addCase(deleteHotel.fulfilled,(state,action)=>{
        state.loading=false;
        state.hotel = state.hotel.filter((h)=>h.hotelId!==action.payload.id);
    })
    .addCase(deleteHotel.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message||"failed to delete hotel";
    })
  },
});

export const { reducer: HotelReducer } = hotelSlice;
