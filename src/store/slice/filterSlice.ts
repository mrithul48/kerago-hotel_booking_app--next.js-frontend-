import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FecilityItem {
  title: string;
  value: boolean;
}

interface FilterState {
  items: FecilityItem[];
}

const initialState: FilterState = {
  items: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleData: (state, action: PayloadAction<{ title: string; value: boolean }>) => {
      const { title, value } = action.payload;
      if (value) {
        if (!state.items.find((i) => i.title === title)) {
          state.items.push({ title, value: true });
        }
      } else {
        state.items = state.items.filter((i) => i.title !== title);
      }
    },
  },
});

export const { toggleData } = filterSlice.actions
export const {reducer: filterReducer } = filterSlice;
