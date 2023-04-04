import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import {createOrderAction} from "../redux/actions/orderAction";
import Loading from "../components/Loading";

function PlaceOrderPage(props) {
    const cart = useSelector(state => state.cart);
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0); //ürünlerin toplam fiyatı
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10); //ürünlerin toplam fiyatı 100 TL'den büyükse kargo ücreti 0 TL, küçükse 10 TL
    cart.taxPrice = Number((0.08 * cart.itemsPrice).toFixed(3)); //ürünlerin toplam fiyatının %15'i
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(3); //ürünlerin toplam fiyatı + kargo ücreti + vergi
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const creteOrder = useSelector(state => state.createOrder);
    const {order, success, error,loading} = creteOrder;

    console.log(order)

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`);
            dispatch({type: "CREATE_ORDER_RESET"});
        }
    }, [success, navigate, dispatch, order]);

    useEffect(() => {
        if(!cart.paymentMethod) navigate("/payment");
    }, [cart.paymentMethod, navigate]);

    console.log(cart)
    const placeOrder = () => {                                              //order oluşturduğumuz yer
        dispatch(createOrderAction({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Row>
                <Col md={8}>
                    <Card>
                        <ListGroup variant={"flush"}>
                            <ListGroup.Item>
                                <h2>Order Information</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3}>Shipping</Col>
                                    <Col>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3}>Payment Method</Col>
                                    <Col>{cart.paymentMethod}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
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
                            {cart.cartItems.length !== 0 ? cart.cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col>
                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                        </Col>
                                        <Col className={"d-flex align-items-center"}>{item.name}</Col>
                                        <Col className={"d-flex align-items-center"}>{item.price}</Col>
                                        <Col className={"d-flex align-items-center"}>{item.quantity}</Col>
                                        <Col className={"d-flex align-items-center"}>{item.price * item.quantity}</Col>
                                    </Row>
                                </ListGroup.Item>
                            )): <ListGroup.Item className={"d-flex justify-content-start align-content-centers"}><AlertMessage variant={"danger"} message={"Your cart is empty"}></AlertMessage></ListGroup.Item>}
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                {loading ? <Loading/> : <Button onClick={placeOrder} className={"w-100"} disabled={cart.cartItems.length === 0} >Complete Order</Button>}
                            </ListGroup.Item>
                            {error && <AlertMessage variant={"danger"} message={error}></AlertMessage> }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PlaceOrderPage;