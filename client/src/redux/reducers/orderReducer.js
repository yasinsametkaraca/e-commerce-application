import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_RESET,
    CREATE_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDERS_BY_USER_REQUEST,
    ORDERS_BY_USER_SUCCESS, ORDERS_BY_USER_FAIL, ORDERS_BY_USER_RESET,
} from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {loading: true};
        case CREATE_ORDER_SUCCESS:
            return {loading: false, success: true, order: action.payload};
        case CREATE_ORDER_FAIL:
            return {loading: false, error: action.payload};
        case CREATE_ORDER_RESET:
            return {};
        default:
            return state;
    }
}
export const orderDetailsReducer = (state = {loading: true, orderItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const ordersByUserReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDERS_BY_USER_REQUEST:
            return {...state, loading: true};
        case ORDERS_BY_USER_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDERS_BY_USER_FAIL:
            return {loading: false, error: action.payload};
        case ORDERS_BY_USER_RESET:
            return {orders: []};
        default:
            return state;
    }
}