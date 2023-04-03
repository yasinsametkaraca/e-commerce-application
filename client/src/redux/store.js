import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducer, productListReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {userProfileReducer, userReducer} from "./reducers/userReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    userProfile: userProfileReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    cart: {cartItems: cartItemsFromStorage},     //cartItemsın başlangıç değeri localStorage'dan geliyor.
    user: {userInfo: userInfoFromStorage},    //userInfo'nun başlangıç değeri localStorage'dan geliyor.
    userProfile: {userInfo : userInfoFromStorage}
};
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(thunk)));
export default store;