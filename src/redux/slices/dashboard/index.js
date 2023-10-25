import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBooleanValue:true
}

const DashboardState = createSlice({
    initialState:initialState,
    name:"DashboardState",
    reducers:({
        toggleDashboardBoolean: (state) => {
            state.isBooleanValue = !state.isBooleanValue;
          },
          setDashboardBooleanValue: (state, action) => {
            state.isBooleanValue = action.payload;
          },
    })
})

export const { toggleDashboardBoolean, setDashboardBooleanValue } = DashboardState.actions;

export default DashboardState.reducer;