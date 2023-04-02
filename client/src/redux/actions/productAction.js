import {
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";
import axios from "axios";

export const productListAction = () => async (dispatch) => {    //productlar için action oluşturduk.
    try {
        dispatch({type: PRODUCT_LIST_REQUEST}); //request atıyoruz. Loading true oluyor.
        const {data} = await axios.get("/api/products/");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data}); //request başarılıysa payload ile datayı gönderiyoruz. Aynı zamanda loading false oluyor.
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });  //request başarısızsa payload ile hata mesajını gönderiyoruz. Ama backendden dönen bir hata mesajı varsa onu göster yoksa default olarak error.message (try catch içindeki) göster.
    }
}
export const productDetailsAction = (id) => async (dispatch) => {    //product detayları için action oluşturduk.
    try {
        dispatch({type: PRODUCT_DETAIL_REQUEST});
        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data});
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
}

