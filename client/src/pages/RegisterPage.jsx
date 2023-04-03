import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { registerAction} from "../redux/actions/userAction";
import FormContainer from "../components/FormContainer";
import {Form} from "react-bootstrap";
import Loading from "../components/Loading";
import AlertMessage from "../components/AlertMessage";

function RegisterPage(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const user = useSelector(state => state.user);
    const {userInfo,error,loading} = user;


    useEffect(() => {
        if(userInfo){
            navigate(redirect);  //kullanıcı giriş yapmışsa eğer login sayfasına girmesini engelliyoruz.
        }
    }, [navigate,userInfo,redirect]);

    const registerHandler = (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage("Passwords do not match.");
        }else if(password.length < 6){
            setMessage("Password must be at least 6 characters.")
        }else if(username.length === 0){
            setMessage("Username must be at least 1 character.")
        }else if(name.length === 0){
            setMessage("Name must be at least 1 character.")
        }
        else{
            dispatch(registerAction(username, password, name, email));
        }
    }
    return (
        <FormContainer>
            <h1 className={"d-flex justify-content-center mb-3"}>Register</h1>
            <Form onSubmit={registerHandler}>
                <Form.Group controlId={"username"}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter username"} value={username} onChange={(event) => setUsername(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId={"name"}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter name"} value={name} onChange={(event) => setName(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId={"email"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type={"text"} placeholder={"Enter email"} value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId={"password"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={"password"} placeholder={"Enter password"} value={password} onChange={(event) => setPassword(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId={"confirmPassword"}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type={"password"} placeholder={"Enter confirm password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className={"my-3 d-flex justify-content-between"}>
                    {loading ? <Loading></Loading> : <button type={"submit"} className={"btn btn-primary w-25"}>Register</button>}
                    <div>Do you have an account? <Link to={"/login"}>Login</Link></div>
                </Form.Group>
                {error && <AlertMessage variant={"danger"} message={error}></AlertMessage>}
                {message && <AlertMessage variant={"danger"} message={message}></AlertMessage>}
            </Form>
        </FormContainer>
    );
}

export default RegisterPage;