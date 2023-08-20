
const initialState = {
    hotels: []
};
  
  const hotelReducer = (state = initialState, action) => {
    console.log("hotelreducer")
    if (action.type ==='hotel/allHotelFromDB') {
        return action.payload
    } else {
        return state;
    }
  };
  
  export default hotelReducer;