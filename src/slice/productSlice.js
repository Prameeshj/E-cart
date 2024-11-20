import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// action return promise
export const fetchProducts = createAsyncThunk("products/fetchProducts",async()=>{
    const result = await axios.get("https://dummyjson.com/products")
    // console.log(result.data.products);
    sessionStorage.setItem("allproducts",JSON.stringify(result.data.products))
    return result.data.products
    
})

const productSlice = createSlice({
    name:'products',
    initialState:{
        allProducts:[],
        dummyallProducts:[],
        loading:false,
        errorMsg:""
    },
    reducers:{
        searchProducts : (state,actionByHeader)=>{
            state.allProducts= state.dummyallProducts.filter(item=>item.title.toLowerCase().includes(actionByHeader.payload))
        } 
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.allProducts = []
            state.dummyallProducts = []
            state.loading = true
            state.errorMsg=""
        })
        builder.addCase(fetchProducts.fulfilled,(state,apiResult)=>{
            state.allProducts = apiResult.payload
            state.dummyallProducts = apiResult.payload
            state.loading = false
            state.errorMsg=""
        })
        builder.addCase(fetchProducts.rejected,(state)=>{
            state.allProducts = []
            state.dummyallProducts = []
            state.loading = false
            state.errorMsg="API Call Failed"
        })
    }
})

export const {searchProducts} = productSlice.actions
export default productSlice.reducer