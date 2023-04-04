import React, {useEffect, useState} from 'react';
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {savePaymentMethodAction} from "../redux/actions/cartAction";

function PaymentPage(props) {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [payment,setPayment] = useState("Credit Card");

    useEffect(() => {
        if(!shippingAddress?.address) navigate("/shipping");
    }, [shippingAddress?.address, navigate]);

    const paymentHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethodAction(payment));
        navigate("/placeorder");
    }



    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h3 className={"d-flex justify-content-center"}>Payment</h3>
            <Form onSubmit={paymentHandler} className={"mt-3"}>
                <Form.Group required controlId={"payment"} className={"mb-2"}>
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Check
                        type={"radio"}
                        label={"Credit Card"}
                        id={"pay"}
                        name={"payment"}
                        checked
                        onChange={(e) => setPayment(e.target.value)}
                    >
                    </Form.Check>
                </Form.Group>
                <button type={"submit"} className={"btn btn-primary w-25 my-2"}>Order</button>
            </Form>
        </FormContainer>
    );
}

export default PaymentPage;