import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimeAllocationSavedState {
  timeAllocationSaveState: boolean;
}

const initialState: TimeAllocationSavedState = {
  timeAllocationSaveState: true,
};

const timeAllocationSaveSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    setTimeAllocationSaved: (state) => {
      state.timeAllocationSaveState = true;
    },
    setTimeAllocationUnsaved: (state) => {
      state.timeAllocationSaveState = false;
    },
  },
});

export const { setTimeAllocationSaved, setTimeAllocationUnsaved } = timeAllocationSaveSlice.actions;

export default timeAllocationSaveSlice.reducer;
