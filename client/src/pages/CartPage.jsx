import React, {useEffect} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCartAction, removeFromCartAction} from "../redux/actions/cartAction";
import {Col, Image, ListGroup, Row, Form, Card} from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import Button from "react-bootstrap/Button";

function CartPage(props) {
    const {id} = useParams();
    const useQuantity = useLocation()  //urlyi kopyaladık.
    const quantity = Number(useQuantity.search.split('=')[1]) //urlde ki quantity değerini aldık.

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    useEffect(() => {
        id && dispatch(addToCartAction(id, quantity));
    }, [dispatch, id, quantity]);

    const removeFromCartHandler = (id) => {
        console.log(id);
        dispatch(removeFromCartAction(id));
    }

    return (
        <div>
            <h4>My Cart</h4>
            <Row>
                <Col md={8}>
                    {
                        cartItems.length === 0 ? (
                           <AlertMessage message={"There are no items in the cart."} variant={"info"}></AlertMessage>
                        ) : (
                           <ListGroup className={"mt-0"} variant={"flush"}>
                                 {cartItems.map(item => (
                                     <div>
                                         <ListGroup.Item key={item.product}>{}</ListGroup.Item>
                                         <Row>
                                            <Col md={2}>
                                                <Image width={100} src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col className={"d-flex align-items-center"} md={2}><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                            <Col className={"d-flex align-items-center"} md={2}>{item.price}</Col>
                                            <Col className={"d-flex align-items-center"} md={3}>
                                                 <Form.Control as={"select"} value={item.quantity} onChange={(e) => dispatch(addToCartAction(item.product, Number(e.target.value)))}>
                                                        {[...Array(item.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))}
                                                 </Form.Control>
                                            </Col>
                                            <Col className={"d-flex align-items-center"} md={1}>
                                                <Button onClick={() => removeFromCartHandler(item.product)} type={"button"} variant={"light"}><i className={"fa fa-trash"}></i></Button>
                                            </Col>
                                         </Row>
                                     </div>
                                 ))}
                           </ListGroup>
                        )
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h4>Total ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h4>
                                ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type={"button"} className={"btn-block"} disabled={cartItems.length === 0}>Complete Your Shopping</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default CartPage;