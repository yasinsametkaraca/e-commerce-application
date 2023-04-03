import React from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

function FormContainer({children}) {
    return (
        <div>
            <Container>
                <Row className={"d-flex justify-content-center"}>
                    <Col xs={12} md={6}>{children}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default FormContainer;