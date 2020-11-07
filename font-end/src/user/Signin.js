import React, { useState } from "react";
import Layout from "../core/Layout";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { signIn, authenticate } from "../state/auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "chaupham.dev@gmail.com",
    password: "Chau369!",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      loading: true,
      [name]: e.target.value,
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signIn({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(
            data,
             () => {
            setValues({
              ...values,
              redirectToReferrer: true,
            });
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const SigninForm = () => (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleChange("email")}
          value={email}
        />
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
        Log in
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

  const showLoading = () =>
    loading && <Alert variant="info">Loading....</Alert>;

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/home" />;
    }
  };
  return (
    <Layout
      title="Sign In Page"
      description=" Sign In to Node React Big Mang Den App"
      children={process.env.REACT_APP_API_URL}
      className="container col-xl-6 offset-xl-3 "
    >
      {SigninForm()}
      {showError()}
      {showLoading()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
