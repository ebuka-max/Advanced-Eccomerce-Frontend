import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import categoryAndBrandService from './categoryAndBrandService';

const initialState = {
    categories: [],
    brands: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Create Category 
export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (formData, thunkAPI) => {
        try {
            return await categoryAndBrandService.createCategory(formData)
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


// get Categories 
export const getCategories = createAsyncThunk(
    "category/getCategories",
    async (_, thunkAPI) => {
        try {
            return await categoryAndBrandService.getCategories()
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

// delete Category 
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (slug, thunkAPI) => {
        try {
            return await categoryAndBrandService.deleteCategory(slug);
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

// Create Brand 
export const createBrand = createAsyncThunk(
    "category/createBrand",
    async (formData, thunkAPI) => {
        try {
            return await categoryAndBrandService.createBrand(formData)
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

// get Brands 
export const getBrands = createAsyncThunk(
    "brand/getBrands",
    async (_, thunkAPI) => {
        try {
            return await categoryAndBrandService.getBrands()
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


// delete Brands 
export const deleteBrand = createAsyncThunk(
    "brand/deleteBrand",
    async (slug, thunkAPI) => {
        try {
            return await categoryAndBrandService.deleteBrand(slug);
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



const categoryAndBrandSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        RESET_CAT(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // create Category
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("category created successfull")
                // console.log(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.success(action.payload);
            })


            // get Categories
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categories = action.payload;
                // console.log(action.payload);
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.success(action.payload);
            })

            // delete Category
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success(action.payload);
                // console.log(action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.success(action.payload);
            })




            // create Brands
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Brand created successfull")
                // console.log(action.payload);
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })


            // get Brands
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.brands = action.payload;
                // console.log(action.payload);
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.success(action.payload);
            })



            // delete Brand
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success(action.payload);
                console.log(action.payload);
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.success(action.payload);
            })

    }
});

export const { RESET_CAT } = categoryAndBrandSlice.actions

export default categoryAndBrandSlice.reducer