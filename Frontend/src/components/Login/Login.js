import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login,setUsers,userId} from "../../redux/reducers/auth"
function BasicExample() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  //===================================
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

 
  return (
    <Form style={{ width: "35rem", marginLeft: "33%", marginTop: "9%" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required onChange={(e)=>{
          setEmail(e.target.value)
        }} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required onChange={(e)=>{
          setPassword(e.target.value)
        }} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button  onClick={(e) => {
                  e.preventDefault();
                  axios
                  .post("http://localhost:5000/login", {
                    email,
                    password,
                  })
                  .then((result) => {
                    if (result.data.success) {
                      setMessage("login succefull");
                      console.log(result.data.result[0].id);
                      dispatch(login(result.data.token));
                      dispatch(userId(result.data.result[0].id));
                      localStorage.setItem("userId", result.data.result[0].id);
                        navigate("/");
                      
                    }
                  })
            
                  .catch((err) => {
                    setMessage("Error happened while Login, please try again");
                  });
            }} variant="primary" type="submit">
        Login
      </Button>
      <br/>
      <br/>
      <p>{message}</p>
    </Form>
  );
}

export default BasicExample;