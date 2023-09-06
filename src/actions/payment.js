import axios from "../utils/axios";
import cookie from 'js-cookie';

export function sendPaymentLink(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/create/paymentLink", credentials)
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
