import {
    USER_DETAIL_FAIL,
    USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
} from "../constants/userConstants";
import axios from "axios";


export const loginAction = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {headers: {'Content-Type': 'application/json'}}
        const {data} = await axios.post('/api/users/login', {username, password}, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });  //login olunca user bilgilerini payload olarak gönderiyoruz. Olmazsa catch e düşüyor.
        localStorage.setItem('userInfo', JSON.stringify(data));  //localstorage'a user bilgilerini kaydediyoruz.

    } catch (err) {
        dispatch({ type: USER_LOGIN_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}
export const registerAction = (username, password, name, email) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {headers: {'Content-Type': 'application/json'}}
        const {data} = await axios.post('/api/users/register', {username, password, name, email}, config);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({ type: USER_REGISTER_FAIL, payload: err.response && err.response.data.detail ? err.response.data.detail : err.message });
    }
}

export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo');  //sonradan cookilerle yapıcam burayı.
    dispatch({ type: USER_LOGOUT });
}

export const getUserDetailAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAIL_REQUEST });
        const {user: {userInfo}} = getState();
        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`}}
        const {data} = await axios.get(`/api/users/profile`, config);
        dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: USER_DETAIL_FAIL, payload: err.response && err.response.data.detail ? err.response.data.detail : err.message });
    }
}