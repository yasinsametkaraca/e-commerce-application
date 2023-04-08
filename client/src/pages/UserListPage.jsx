import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getOrdersByUserAction} from "../redux/actions/orderAction";
import {userDeleteAction, userListAction} from "../redux/actions/adminAction";
import Loading from "../components/Loading";
import AlertMessage from "../components/AlertMessage";
import {Button, Table} from "react-bootstrap";

function UserListPage() {

    const user = useSelector(state => state.user);
    const {userInfo} = user;
    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDelete = useSelector(state => state.userDelete);
    const {loading:loadingDelete, success:successDelete} = userDelete;


    useEffect(() => {
        if (userInfo && !userInfo.isAdmin) {
            navigate("/login");
        } else {
            dispatch(userListAction())
        }
    }, [dispatch, navigate, userInfo, successDelete]);


    const deleteUser = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(userDeleteAction(id));
           //to do : add alert message and filter the deleted user from the list
        }
    }
    return (
        <div>
            <h2>Users</h2>
            {loading ? <Loading></Loading> : error ? <AlertMessage variant={"danger"} message={error}></AlertMessage> : (
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "YES" : "NO"}</td>
                                <td>
                                    <Button className={"mr-1"}><i className={"fas fa-edit"}></i></Button>
                                    <Button onClick={() => deleteUser(user._id)}><i className={"fas fa-trash"}></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default UserListPage;