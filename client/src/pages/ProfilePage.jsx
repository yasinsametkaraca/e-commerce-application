import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Col, Row, Form, Table} from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import {updateUserProfileAction} from "../redux/actions/userAction";
import {getOrdersByUserAction} from "../redux/actions/orderAction";

function ProfilePage(props) {

    const [userDetails, setUserDetails] = useState({
        username: "",
        name: "",
        email: "",
    });
    const [message, setMessage] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const {userInfo,loading} = user;
    const userProfileUpdate = useSelector(state => state.userProfile);
    const {success,error} = userProfileUpdate;
    const ordersByUser = useSelector(state => state.ordersByUser);
    const {orders,error:errorOrders, loading:loadingOrders} = ordersByUser;

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            dispatch(getOrdersByUserAction())
            setUserDetails({
                username: userInfo.username,
                name: userInfo.name,
                email: userInfo.email,
            });
        }
    }, [dispatch, navigate, userInfo]);

    const updateUserProfile = (e) => {
       e.preventDefault();
       if(userDetails.username.length > 0 && userDetails.name.length > 0 && userDetails.email.length > 0){
           setMessage(null)
           dispatch(updateUserProfileAction(userDetails));

           setMessage("Profile updated successfully.")
       }else {
           setMessage("All fields are required.");
       }
    }

    return (
        <div>
            <Row className={"justify-content-md-center"}>
                <Col md={4}>
                    <h2 className={"nav-item"}>My Profile</h2>
                    <Form onSubmit={updateUserProfile} className={"mt-3"}>
                        <Form.Group required controlId={"username"}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type={"text"} placeholder={"Enter username"} value={userDetails.username} onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}></Form.Control>
                        </Form.Group>
                        <Form.Group required controlId={"name"}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type={"text"} placeholder={"Enter name"} value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}></Form.Control>
                        </Form.Group>
                        <Form.Group required controlId={"email"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type={"email"} placeholder={"Enter email"} value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}></Form.Control>
                        </Form.Group>
                        {loading ? <Loading></Loading> : <button type={"submit"} className={"btn btn-primary w-25 my-2"}>Update</button>}
                        {success && <AlertMessage variant={"info"} message={message}></AlertMessage>}
                        {error && <AlertMessage variant={"warning"} message={error}></AlertMessage>}
                    </Form>
                </Col>
                <Col md={8}>
                    <h2 className={"nav-item"}>My Orders</h2>
                    {loadingOrders ? <Loading></Loading> : errorOrders ? <AlertMessage variant={"warning"} message={errorOrders}></AlertMessage> : (
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Total Price</th>
                                    <th>Payment Status</th>
                                    <th>Order Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order?._id}</td>
                                        <td>{order?.createAt?.substring(0,10)}</td>
                                        <td>{order?.totalPrice}</td>
                                        <td>{order?.isPaid ? order.paidAt?.substring(0,10) : "Not Paid"}</td>
                                        <td>{order?.isDelivered ? order.deliveredAt?.substring(0,10) : "Not Delivered"}</td>
                                        <td><Link to={`/order/${order._id}`} className={"btn btn-primary"}>Details</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default ProfilePage;