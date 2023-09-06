import axios from "../utils/axios";


export function getBookingByEmail() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/bookingByEmail")
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


export function getBooking() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/booking")
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

export function getAllBooking() {
  return new Promise((resolve, reject) => {
    axios
      .get("/get/allBookingDB")
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

export function getTransaction() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/transaction")
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


export function getAllBookingDB() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/allBookingDB")
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

  export function getBookingByUser() {
    return new Promise((resolve, reject) => {
      axios
        .get("/get/allBookingByUserDB")
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


  export function addBooking(bookingInfo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/create/booking", bookingInfo)
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