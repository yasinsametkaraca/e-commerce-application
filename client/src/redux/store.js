import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducer, productListReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const initialState = {
    cart: {cartItems: cartItemsFromStorage}     //cartItemsın başlangıç değeri localStorage'dan geliyor.
};
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(thunk)));
export default store;