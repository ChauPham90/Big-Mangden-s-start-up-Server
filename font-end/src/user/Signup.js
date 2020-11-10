import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Layout from "../core/Layout";
import { signUp } from "../state/auth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const { name, email, password, success, error } = values;

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <Form>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter name"
          onChange={handleChange("name")}
          value={name}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleChange("email")}
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handleChange("password")}
          value={password}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
  );

  const showError = () => {
    return (
      <Alert variant="danger" style={{ display: error ? "" : "none" }}>
        {error}
      </Alert>
    );
  };

  const showSuccess = () => {
    return (
      <Alert variant="info" style={{ display: success ? "" : "none" }}>
        New accout is created. Please <Link to="/signin">Signin</Link>
      </Alert>
    );
  };
  return (
    <Layout
      title="Sign up Page"
      description=" Sign up to Node React Big Mang Den App"
      className="container col-xl-6 offset-xl-3 "
    >
      {signUpForm()}
      {showError()}
      {showSuccess()}
    </Layout>
  );
};

export default Signup;
