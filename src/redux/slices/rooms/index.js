import { createSlice } from "@reduxjs/toolkit";

const roomslice = createSlice({
    initialState: {
        name: null
    },
    name: 'Rooms',
    reducers: ({
        room: (state) => {
            state.name = "XYZ"
        }
    })
})
export const {room} = roomslice.actions
export default roomslice.reducer