import React from 'react';
import {Alert} from "react-bootstrap";

function AlertMessage({variant,message}) {
    return (
        <div>
            <Alert key={variant} variant={variant}>{message}</Alert>
        </div>
    );
}

export default AlertMessage;