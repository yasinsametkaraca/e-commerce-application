import React from 'react';
import {Col, Row} from "react-bootstrap";
import products from "../product";
import Product from "../components/Product";
import Container from "react-bootstrap/Container";

function HomePage(props) {
    return (
        <Row className={"d-flex justify-content-between"}>
            {products.map(product => (
                <Col key={product._id} className={"mt-2 mb-2 d-flex justify-content-between"} sm={12} md={6} lg={4}
                     xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    );
}

export default HomePage;