import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import {Route, Routes} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Container from "react-bootstrap/Container";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";

function App() {
    return (
        <>
            <Header></Header>
            <Container className={"mb-5 mt-4"}>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}></Route>
                    <Route path={"/about"} element={<AboutPage/>}></Route>
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart/:id?" element={<CartPage />} />
                    <Route path="/cart/:id" element={<CartPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path={"/login"} element={<LoginPage/>}></Route>
                    <Route path={"/register"} element={<RegisterPage/>}></Route>
                    <Route path={"/profile"} element={<ProfilePage/>}></Route>
                    <Route path={"/shipping"} element={<ShippingPage/>}></Route>
                    <Route path={"/payment"} element={<PaymentPage/>}></Route>
                    <Route path={"/placeorder"} element={<PlaceOrderPage/>}></Route>
                    <Route path={"/order/:id"} element={<OrderPage/>}></Route>
                </Routes>
            </Container>
            <Footer></Footer>
        </>
    );
}

export default App;
