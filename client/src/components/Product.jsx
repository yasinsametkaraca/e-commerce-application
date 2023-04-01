import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import Rating from "./Rating";
import {Link} from "react-router-dom";

function Product({product}) {

    return (
        <Card className={"d-flex justify-content-center"}>
            <Link to={`/product/${product._id}`}><Card.Img variant="top" src={product.image} /></Link>
            <Card.Body className={"text-center"}>
                <Card.Text style={{fontSize: "14px"}}>
                    {product.category}
                </Card.Text>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description.substring(0,29)}
                </Card.Text>
                <Card.Text>
                    <Rating value={product.rating} ></Rating>
                </Card.Text>
                <Card.Text className={"text-muted"}>
                    {product.numReviews} reviews
                </Card.Text>
                <Card.Text className={"text-danger text-lg-center"} style={{backgroundColor:"lightgray", display:"inline-block"}}>
                    {product.price}$
                </Card.Text>
                <Card.Text>
                    <Card.Link href="#">Add to cart</Card.Link>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default Product;