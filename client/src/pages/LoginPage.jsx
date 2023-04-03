import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {loginAction} from "../redux/actions/userAction";
import FormContainer from "../components/FormContainer";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import {Form} from "react-bootstrap";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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

    const loginHandler = (event) => {
        event.preventDefault();
        dispatch(loginAction(username,password));
    }

    return (
        <div>
            <FormContainer>
                <h1 className={"d-flex justify-content-center mb-3"}>Login</h1>
                <Form onSubmit={loginHandler}>
                    <Form.Group controlId={"username"}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type={"text"} placeholder={"Enter username"} value={username} onChange={(event) => setUsername(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId={"password"}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={"password"} placeholder={"Enter password"} value={password} onChange={(event) => setPassword(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className={"my-3 d-flex justify-content-between"}>
                        {loading ? <Loading></Loading> : <button type={"submit"} className={"btn btn-primary w-25"}>Login</button>}
                        <div>Don't have an account? <Link to={"/register"}>Register</Link></div>
                    </Form.Group>
                    {error && <AlertMessage variant={"danger"} message={"Username or password is incorrect."}></AlertMessage>}
                </Form>
            </FormContainer>
        </div>
    );
}

export default LoginPage;