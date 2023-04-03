import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Col, Row, Form} from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import {updateUserProfileAction} from "../redux/actions/userAction";

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

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            setUserDetails({
                username: userInfo.username,
                name: userInfo.name,
                email: userInfo.email,
            });
        }
    }, [dispatch, navigate, userInfo]);

    function updateUserProfile(e) {
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
            </Row>
        </div>
    );
}

export default ProfilePage;