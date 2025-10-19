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

// update hotel


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
