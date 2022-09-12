import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function BasicExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <Form style={{ width: "35rem", marginLeft: "33%", marginTop: "9%" }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="text"
          placeholder="Username"
        />
        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
      <Button
        onClick={(e) => {
          e.preventDefault();
          axios
            .post("http://localhost:5000/signup/", {
              email,
              password,
              userName,
              role_id: 2,
            })

            .then((result) => {
              if (result.data.success) {
                setMessage("Create account successfully");
                navigate("/login");
              }
            })
            .catch((err) => {
              console.log(err.message);
              setMessage("try again");
            });
        }}
        variant="primary"
        type="submit"
      >
        Regist
      </Button>
      <br />
      <p>{message}</p>
    </Form>
  );
}

export default BasicExample;
