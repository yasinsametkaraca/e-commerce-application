import {
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";

export const productListReducer = (state= {products:[]}, action) => {    //productlar için reducer oluşturduk.
    switch(action.type){
        case PRODUCT_LIST_REQUEST:                                                      //ürünlerin gelmesi için istek.
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:                                                      //ürünler geldiyse yani.
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:                                                         //ürünler gelmediyse.
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const productDetailsReducer = (state= {product: {reviews: [] }}, action) => {    //product detayları için reducer oluşturduk.
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_DETAIL_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAIL_FAIL:                                                       
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}