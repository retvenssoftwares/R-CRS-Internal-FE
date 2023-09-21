import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
};

const RoleState = createSlice({
  initialState: initialState,
  name: "role",
  reducers: {
    setRoles: (state, action) => (state.role = action.payload),
  },
});

export const { setRoles } = RoleState.actions;
export default RoleState.reducer;
