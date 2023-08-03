import axios from "axios";

if (process.env.NODE_ENV==='development') axios.defaults.baseURL = 'https://91.201.53.108'
export default axios
