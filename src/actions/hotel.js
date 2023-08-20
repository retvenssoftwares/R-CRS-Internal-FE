import axios from "../utils/axios";


export function getHotelDB() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/hotelDB")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


export function getHotelInformation() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/hotelInfo")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

export function getHotelAmenities() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/amenities")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export function getHotelRoomType() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/roomType")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export function getHotelRoomAvailability() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/roomAvailablity")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export function getHotelRoomInventory() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/roomInventory")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export function getHotelRoomRate() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/roomRates")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export function addHotel(hotelInfo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/add/hotel", hotelInfo)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


