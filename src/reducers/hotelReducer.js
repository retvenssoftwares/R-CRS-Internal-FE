
const initialState = {
    hotels: []
};
  
  const hotelReducer = (state = initialState, action) => {
    if (action.type ==='hotel/allHotelFromDB') {
        return action.payload
    } else {
        return state;
    }
  };
  
  export default hotelReducer;