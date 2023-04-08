import React, {useEffect, useState} from 'react';
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {saveShippingAddressAction} from "../redux/actions/cartAction";
import {Form} from "react-bootstrap";

function ShippingPage() {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shipping,setShipping] = useState({...shippingAddress});

    useEffect(() => {
        if (localStorage.getItem("userInfo") === null) {
            navigate("/login")
        }
    }, [navigate]);

    const shippingHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddressAction(shipping));
        navigate("/payment");
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <h3 className={"d-flex justify-content-center"}>Shipping</h3>
            <Form onSubmit={shippingHandler} className={"mt-3"}>
                <Form.Group required controlId={"address"} className={"mb-2"}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter address"} value={shipping?.address} onChange={(e) => setShipping({...shipping, address: e.target.value})}></Form.Control>
                </Form.Group>
                <Form.Group required controlId={"city"} className={"mb-2"}>
                    <Form.Label>City</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter city"} value={shipping?.city} onChange={(e) => setShipping({...shipping, city: e.target.value})}></Form.Control>
                </Form.Group>
                <Form.Group required controlId={"postalCode"} className={"mb-2"}>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter postal code"} value={shipping?.postalCode} onChange={(e) => setShipping({...shipping, postalCode: e.target.value})}></Form.Control>
                </Form.Group>
                <Form.Group required controlId={"country"} className={"mb-2"}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter country"} value={shipping?.country} onChange={(e) => setShipping({...shipping, country: e.target.value})}></Form.Control>
                </Form.Group>
                <button type={"submit"} className={"btn btn-primary w-25 my-2"}>Shipping</button>
            </Form>
        </FormContainer>
    );
}

export default ShippingPage;