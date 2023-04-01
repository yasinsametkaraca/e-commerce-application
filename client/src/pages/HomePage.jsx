import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

function HomePage(props) {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            const {data} = await axios.get("/api/products/");
            setProducts(data);
        }
        getProducts();
    }, []);

    return (
        <Row className={"d-flex justify-content-between"}>
            {products?.map(product => (
                <Col key={product._id} className={"mt-2 mb-2 d-flex justify-content-between"} sm={12} md={6} lg={4}
                     xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    );
}

export default HomePage;