import axios from "axios"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/order/`;

// Create Coupon
const createOrder = async (formData) => {
    const response = await axios.post(API_URL, formData, 
    )
    return response.data.message;
};


// Get all orders
const getOrders = async () => {
    const response = await axios.get( API_URL )
    return response.data;
};

// Get Single order
const getOrder = async (id) => {
    const response = await axios.get( API_URL + id )
    return response.data;
};

const orderService = {
    createOrder,getOrders,getOrder
}


export default orderService;