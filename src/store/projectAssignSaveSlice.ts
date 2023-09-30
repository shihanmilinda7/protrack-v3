import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectAssignSavedState {
  projectAssignSaveState: boolean;
  curPrjTaskRowOj: any[];
}

const initialState: ProjectAssignSavedState = {
  projectAssignSaveState: true,
  curPrjTaskRowOj: [],
};

const projectAssignSaveSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    setProjectAssignSaved: (state) => {
      state.projectAssignSaveState = true;
    },
    setProjectAssignUnsaved: (state) => {
      state.projectAssignSaveState = false;
    },
    setCurPrjTaskRowOj: (state, action) => {
      state.curPrjTaskRowOj = action.payload;
    },
  },
});

export const {
  setProjectAssignSaved,
  setProjectAssignUnsaved,
  setCurPrjTaskRowOj,
} = projectAssignSaveSlice.actions;

export default projectAssignSaveSlice.reducer;
