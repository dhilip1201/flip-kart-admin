import { productConstants } from "../actions/constants";
const initialState={
    products:[],
    loading:false,
    message:"",
    error:null
}

export default (state= initialState,action)=>{
    console.log(action)
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.products
            }
            break;
        case productConstants.ADD_PRODUCT_REQUEST: 
            state={
                ...state,
                loading:true,
            }
            break;
        case productConstants.ADD_PRODUCT_SUCCESS:
            state={
                ...state,
                loading:false,
                message:action.payload.message
            }
            break;
        case productConstants.ADD_PRODUCT_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        
    }
    return state;
}