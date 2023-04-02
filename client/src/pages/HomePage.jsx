import React, {useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {productListAction} from "../redux/actions/productAction";
import Loading from "../components/Loading";
import AlertMessage from "../components/AlertMessage";

function HomePage(props) {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);

    return (
        <Row className={"d-flex justify-content-center"}>
            {loading ? <Loading/>
                : error
                ? <AlertMessage variant={"danger"} message={error} />
                : (
                    products?.map(product => (
                    <Col key={product._id} className={"mt-2 mb-2 d-flex justify-content-between"} sm={12} md={6} lg={4}
                         xl={3}>
                        <ProductCard product={product}/>
                    </Col>
                )))
            }
        </Row>
    );
}

export default HomePage;