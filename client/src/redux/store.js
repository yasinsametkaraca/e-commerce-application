import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducer, productListReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {userProfileReducer, userReducer} from "./reducers/userReducer";
import {createOrderReducer} from "./reducers/orderReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    userProfile: userProfileReducer,
    createOrder: createOrderReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : {};

const initialState = {
    cart: {                                                         //cartItemsın başlangıç değeri localStorage'dan geliyor.
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    user: {userInfo: userInfoFromStorage},    //userInfo'nun başlangıç değeri localStorage'dan geliyor.
    userProfile: {userInfo : userInfoFromStorage},

};
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(thunk)));
export default store;