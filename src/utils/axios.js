import axios from "axios";

export default axios.create({
  baseURL:"https://admin.retvenscrm.com/api",
  validateStatus: (status) => status < 500,
});
