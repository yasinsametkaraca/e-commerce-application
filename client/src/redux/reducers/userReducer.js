import {
    USER_DETAIL_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_RESET,
    USER_DETAIL_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:  //USER_LOGIN_REQUEST action'ı geldiğinde loading'i true yapıyoruz.
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

export const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:  //user detail var ama onunla ilgili hiç birşey yapmadım çünkü ilerde profile bilgileri için daha çok şey doldurulabilir.
            return { loading: true, ...state };
        case USER_DETAIL_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        case USER_DETAIL_RESET:
            return { user: {} };
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}