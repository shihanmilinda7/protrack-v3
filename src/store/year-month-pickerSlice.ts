import { createSlice } from "@reduxjs/toolkit";

interface YearMonthState {
  year: any;
  month: any;
}

const initialState: YearMonthState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
};

const yearMonthPickerSlice: any = createSlice({
  name: "year-month",
  initialState,
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
  },
});

export const { setYear,setMonth } = yearMonthPickerSlice.actions;

export default yearMonthPickerSlice.reducer;
