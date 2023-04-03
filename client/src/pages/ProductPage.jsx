import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Rating from "../components/Rating";
import Button from "react-bootstrap/Button";
import { ListGroup, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {productDetailsAction} from "../redux/actions/productAction";
import Loading from "../components/Loading";
import AlertMessage from "../components/AlertMessage";
const ProductPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(productDetailsAction(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?quantity=${quantity}`)
    }

    return (
        <>
            {loading ? <Loading /> : error ? <AlertMessage variant={"danger"} message={error}/> :
                <div>
                    <div className={"header"}>
                        <div className={"row d-flex justify-content-between"}>
                            <div className={"col-md-6"}><h4>{product?.name}</h4></div>
                            <div className={"d-flex justify-content-between col-md-6"}>
                                <div className={"col-md-3 d-flex align-items-center"}><Rating value={product?.rating}></Rating></div>
                                <i className={"col-md-3 d-flex align-items-center"}><i className={"fa fa-eye"}></i>Reviews {product?.reviewsCount}</i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={"row mt-3"}>
                            <div className={"col-md-6"}>
                                <img width={600} src={product?.image} alt={product?.name} className={"img-fluid"}/>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"col-md-12 my-2"}>
                                    {product?.description}
                                </div>
                                <ListGroup>
                                    <ListGroup.Item>Category: {product?.categoryName}</ListGroup.Item>
                                    <ListGroup.Item>Stok: {product?.countInStock}</ListGroup.Item>
                                    <ListGroup.Item>Brand: {product?.brand}</ListGroup.Item>
                                    <ListGroup.Item>Price: {product?.price}</ListGroup.Item>
                                </ListGroup>
                                <div className={"col-md-12 mt-3"}>
                                    {
                                        product?.countInStock > 0 ? (
                                            <>
                                                <div className={"d-flex justify-content-between"}>
                                                    <div className={"d-flex align-items-center"}><span className={"mr-1"}>Quantity </span>
                                                        <Form.Control as={"select"} value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                                            {
                                                                [...Array(product?.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}>{x + 1}</option>)
                                                            }
                                                        </Form.Control>
                                                    </div>
                                                    <div className={"d-flex align-items-center"}>
                                                        <Button disabled={product.countInStock === 0} onClick={addToCartHandler} className={"d-inline"} variant={"primary"}><i className={"fa-solid fa-cart-shopping"}></i>Add Cart</Button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : <AlertMessage variant={"danger"} message={"No Stock"}></AlertMessage>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>

    );
};

export default ProductPage;