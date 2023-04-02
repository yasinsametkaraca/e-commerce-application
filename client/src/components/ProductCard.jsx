import React from 'react';
import {Card} from "react-bootstrap";
import Rating from "./Rating";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

function ProductCard({product}) {

    return (
        <Card border="Info" style={{ width: '25rem' }} className={"d-flex justify-content-center"}>
            <Link to={`/product/${product._id}`}><Card.Img variant="top" src={product.image} height={200}/></Link>
            <Card.Body className={"text-center"}>
                {/*<Card.Text style={{fontSize: "14px"}}>
                    {product.category}
                </Card.Text>*/}
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.description.substring(0,29)}
                </Card.Text>
                <Card.Text>
                    <Rating value={product.rating} ></Rating>
                </Card.Text>
                <Card.Text className={"text-muted"}>
                    {product.reviewsCount} reviews
                </Card.Text>
                <Card.Text className={"text-danger text-lg-center"} style={{backgroundColor:"lightgray", display:"inline-block"}}>
                    {product.price}$
                </Card.Text>
                <Card.Text>
                    <Link to={`/product/${product._id}`}><Button variant="primary">Detail</Button></Link>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default ProductCard;