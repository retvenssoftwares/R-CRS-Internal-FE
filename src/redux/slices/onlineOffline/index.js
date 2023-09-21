import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnline: true,
};

const IsOnlineState = createSlice({
  initialState: initialState,
  name: "isOnline",
  reducers: {
    setOnline: (state) => {
        state.isOnline = true;
      },
      setOffline: (state) => {
        state.isOnline = false;
      },
  },
});

export const { setOnline,setOffline } = IsOnlineState.actions;
export default IsOnlineState.reducer;
