import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {orderDetailsAction} from "../redux/actions/orderAction";
import Loading from "../components/Loading";
import AlertMessage from "../components/AlertMessage";
import {Col, Row} from "react-bootstrap";

function OrderPage(props) {
    const {id} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const user = useSelector(state => state.user);
    const {userInfo} = user;

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    useEffect(() => {
        if(!userInfo){
            navigate("/login");
        }
        if(!order && order?._id !== Number(id)){
            dispatch(orderDetailsAction(id));
        }
    }, [dispatch, order, id, navigate, userInfo]);

    return (
        <div className={"d-flex justify-content-center"}>
            {loading ? <Loading></Loading> : error ? <AlertMessage message={error} variant={"warning"}></AlertMessage> : (
                <div>
                    <AlertMessage message={"Your order has been received successfully"} variant={"success"}/>
                    <h1 className={"d-flex justify-content-center"}>Order Information</h1>
                    <Row>
                        <Col md={8}>

                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default OrderPage;