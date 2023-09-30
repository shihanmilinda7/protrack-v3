import { createSlice } from "@reduxjs/toolkit";

interface DataState {
  staffid: number;
}

const initialState: DataState = {
  staffid: 0,
};

const userDetailsSlice: any = createSlice({
  name: "date",
  initialState,
  reducers: {
    setStaffId: (state, action) => {
      state.staffid = action.payload;
    },
  },
});

export const { setStaffId } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
