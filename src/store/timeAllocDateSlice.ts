import { createSlice } from "@reduxjs/toolkit";

interface DateState {
  date: string;
}

const initialState: DateState = {
  date: new Date().toJSON().slice(0, 10),
};

const timeAllocDateSlice: any = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = timeAllocDateSlice.actions;

export default timeAllocDateSlice.reducer;
