

export const loggedInUser = (userJson) => {
    return (dispatch) => {
        dispatch({
            type: "user/getUserInfo",
            payload: userJson
        })
    }
}

export const selected_hotel_name = (hotelname, hotelID) => {
    return (dispatch) => {
        dispatch({
            type: "hotel/hotelAdded",
            payload: {
                hotelName: hotelname,
                hotel_r_id: hotelID
            }
        })
    }
}


export const get_hotel_list = (hotels) => {
    return (dispatch) => {
        dispatch ({
            type: "hotel/allHotelFromDB",
            payload: hotels
        })
    }
  }

  export const get_room_detail_action = (room) => {
      return (dispatch) => {
          dispatch ({
              type: "hotel/allHotelFromDB",
              payload: room
          })
      }
    }

