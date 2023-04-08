import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS
} from "../constants/adminConstants";
import axios from "axios";

export const userListAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const {user: {userInfo}} = getState();
        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`}}
        const {data} = await axios.get('/api/users', config);
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: USER_LIST_FAIL, payload: err.response && err.response.data.detail ? err.response.data.detail : err.message });
    }
}

export const userDeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        const {user: {userInfo}} = getState();
        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`}}
        await axios.delete(`/api/users/delete/${id}`, config);
        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (err) {
        dispatch({ type: USER_DELETE_FAIL, payload: err.response && err.response.data.detail ? err.response.data.detail : err.message });
    }
}