import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import {Route, Routes} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Container from "react-bootstrap/Container";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

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
                </Routes>
            </Container>
            <Footer></Footer>
        </>
    );
}

export default App;
