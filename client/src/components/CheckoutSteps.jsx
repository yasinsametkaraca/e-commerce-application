import React from 'react';
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

function CheckoutSteps({step1, step2, step3, step4}) {

    return (
        <div>
            <Nav className={"justify-content-center mb-4"}>
                <Nav.Item className={"border"}>
                    {
                       <Nav.Link disabled={!step1}><Link className={!step1 ? "text-secondary" : "text-primary"} to={"/login"}>Login</Link></Nav.Link>
                    }
                </Nav.Item>
                <Nav.Item className={"border"}>
                    {
                        <Nav.Link disabled={!step2}><Link className={!step2 ? "text-secondary" : "text-primary"} to={"/shipping"}>Shipping</Link></Nav.Link>
                    }
                </Nav.Item>
                <Nav.Item className={"border"}>
                    {
                        <Nav.Link disabled={!step3}><Link className={!step3 ? "text-secondary" : "text-primary"} to={"/payment"}>Payment</Link></Nav.Link>
                    }
                </Nav.Item>
                <Nav.Item className={"border"}>
                    {
                        <Nav.Link disabled={!step4} ><Link className={!step4 ? "text-secondary" : "text-primary"} to={"/placeorder"}>Order</Link></Nav.Link>
                    }
                </Nav.Item>
            </Nav>

        </div>
    );
}

export default CheckoutSteps;