import axios from 'axios'
export const baseURL="http://localhost:3032/player";

const baseService=axios.create({
    baseURL:baseURL
})

export default baseService;