import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedState {
  saveState: boolean;
}

const initialState: SavedState = {
  saveState: true,
};

const saveSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    setsaved: (state) => {
      state.saveState = true;
    },
    setunsaved: (state) => {
      state.saveState = false;
    },
  },
});

export const { setsaved, setunsaved } = saveSlice.actions;

export default saveSlice.reducer;
