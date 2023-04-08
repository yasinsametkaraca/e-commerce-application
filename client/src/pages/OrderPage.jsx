import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {orderDetailsAction} from "../redux/actions/orderAction";
import Loading from "../components/Loading";
import AlertMessage from "../components/AlertMessage";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";

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
        if(order && order?._id !== Number(id)){
            dispatch(orderDetailsAction(id));
        }
    }, [dispatch, order, id, navigate, userInfo]);

    return (
        <div className={"d-flex justify-content-center"}>
            {loading ? <Loading></Loading> : error ? <AlertMessage message={error} variant={"warning"}></AlertMessage> : (
                <div className={"w-100"}>
                    <h1 className={"d-flex justify-content-center"}>Order Information</h1>
                    <Row className={"mt-5"}>
                        <Col md={8}>
                            <Card className={"w-100"}>
                                <ListGroup variant={"flush"}>
                                    <ListGroup.Item>
                                        <h2>Personal Information</h2>
                                        <p className={"mt-3 mb-0"}><strong>Name: </strong>{order.user.name}</p>
                                        <p className={"m-0"}><strong>Email: </strong>{order.user.email}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                            <Card className={"mt-3"}>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <h2>Shipping Information</h2>
                                        <p className={"mt-3"}>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card style={{ width: '18rem' }}>
                                <ListGroup variant={"flush"}>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Product Price</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping Price</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax Price</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total Price</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col md={12}>
                            <Card className={"mt-3"}>
                                <ListGroup variant={"flush"}>
                                    <ListGroup.Item>
                                        <h2>Order Products</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Product</Col>
                                            <Col>Name</Col>
                                            <Col>Price</Col>
                                            <Col>Quantity</Col>
                                            <Col>Total</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {order.orderItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row>
                                                <Col>
                                                    <Image src={"/images/" + item.image.split('/')[3]} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                <Col className={"d-flex align-items-center"}>{item.name}</Col>
                                                <Col className={"d-flex align-items-center"}>{item.price}</Col>
                                                <Col className={"d-flex align-items-center"}>{item.quantity}</Col>
                                                <Col className={"d-flex align-items-center"}>{item.price * item.quantity}</Col>
                                            </Row>
                                        </ListGroup.Item>))}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default OrderPage;