import axios from "axios";

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`);
    dispatch({
        type: "CART_ADD_ITEM",
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeFromCartAction = (id) => (dispatch, getState) => {
    dispatch({
        type: "CART_REMOVE_ITEM",
        payload: id
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddressAction = (data) => (dispatch) => {
    dispatch({
        type: "CART_SAVE_SHIPPING_ADDRESS",
        payload: data
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
}