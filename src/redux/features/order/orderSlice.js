import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import orderService from './orderService';

const initialState = {
    order: null,
    orders: [],
    totalOrderAmount: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


// Create Order
export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (formData, thunkAPI) => {
        try {
            return await orderService.createOrder(formData)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get all Orders
export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async (_, thunkAPI) => {
        try {
            return await orderService.getOrders()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Get single Order
export const getOrder = createAsyncThunk(
    "orders/getOrder",
    async (id, thunkAPI) => {
        try {
            return await orderService.getOrder(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                toast.success(action.payload)
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                // console.log(action.payload);
                toast.success(action.payload)
            })


            // Get all orders 
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.orders = action.payload;
                console.log(action.payload);

            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
                toast.success(action.payload);
            })


            // Get Single order
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.orders = action.payload;
                console.log(action.payload);
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
                toast.success(action.payload);
            })
    }
}
);

export const { } = orderSlice.actions

export const selectOrders = (state) => state.order.orders
export const selectTotalOrderAmount = (state) => state.order.totalOrderAmount

export default orderSlice.reducer