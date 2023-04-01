import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import product from "../components/Product";
import Rating from "../components/Rating";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";

const ProductPage = () => {
    const {id} = useParams();

    const [product, setProduct] = useState();
    const getProduct = async (id) => {
        const {data} = await axios.get("/api/products/" + id);
        setProduct(data);
    }
    useEffect(() => {
        getProduct(id);
    }, []);

    return (
        <div>
            <div className={"header"}>
                <div className={"row"}>
                    <div className={"col-md-9"}><h2>{product?.name}</h2></div>
                    <div className={"col-md-3"}><Rating value={product?.rating}></Rating></div>
                    <i className={"col-md-3"}><i className={"fa fa-eye"}></i>Reviews {product?.numReviews}</i>
                </div>
            </div>
            <div>
                <div className={"row mt-3"}>
                    <div className={"col-md-6"}>
                        <img src={product?.image} alt={product?.name} className={"img-fluid"}/>
                    </div>
                    <div className={"col-md-6"}>
                        <div className={"col-md-12 mb-3"}>
                            {product?.description}
                        </div>
                        <ListGroup>
                            <ListGroup.Item>Stok: {product?.countInStock}</ListGroup.Item>
                            <ListGroup.Item>Brand: {product?.brand}</ListGroup.Item>
                            <ListGroup.Item>Category: {product?.category}</ListGroup.Item>
                            <ListGroup.Item>Price: {product?.price}</ListGroup.Item>
                        </ListGroup>
                        <div className={"col-md-12 mt-3"}>
                            <Button variant={"primary"}><i className={"fa-solid fa-cart-shopping"}></i>Add Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;