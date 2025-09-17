import axios from "axios";
console.log(process.env.REACT_APP_SYNERGY_APP_API_URL);
const api=axios.create({
    baseURL:`${process.env.REACT_APP_SYNERGY_APP_API_URL}/app/`,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
    },
    withCredentials:true,
});
export default api;