import axios from "axios"
import { API_URL } from "../config/Api"

const api =  API_URL + "/api/product"

export const fetchProducts = async () => {
    try {
        const response = await axios.get(api)
        console.log("response: " ,response)
    } catch (err) {
        console.error(err)
    }
}