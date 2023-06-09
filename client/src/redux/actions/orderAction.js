import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDERS_BY_USER_FAIL, ORDERS_BY_USER_REQUEST, ORDERS_BY_USER_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";


export const createOrderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST});
        const {user: {userInfo}} = getState(); //getState() ile store'daki state'e ulaşabiliyoruz.

        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`},}
        const {data} = await axios.post(`/api/orders/add`, order, config);
        dispatch({type: CREATE_ORDER_SUCCESS, payload: data});

        dispatch({type: 'CART_CLEAR_ITEMS', payload: data});
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({type: 'CREATE_ORDER_FAIL', payload: error.response && error.response.data.detail ? error.response.data.detail : error.message});
    }
}
export const orderDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});
        const {user: {userInfo}} = getState();

        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`},}
        const {data} = await axios.get(`/api/orders/${id}`, config);
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message});
    }
}

export const getOrdersByUserAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDERS_BY_USER_REQUEST});
        const {user: {userInfo}} = getState();

        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`},}
        const {data} = await axios.get(`/api/orders/user`, config);
        dispatch({type: ORDERS_BY_USER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDERS_BY_USER_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message});
    }
}
