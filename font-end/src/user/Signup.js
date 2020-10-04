import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Layout from "../core/Layout";

const signUpForm = () => (
  <Form>
    <Form.Group controlId="formBasicName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="name" placeholder="Enter name" />
      <Form.Text className="text-muted"></Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
);

const Signup = () => (
  <Layout
    title="Sign up Page"
    description=" Sign up to Node React Big Mang Den App"
    children={process.env.REACT_APP_API_URL}
    className="container col-xl-6 offset-xl-3 "
  >
    {signUpForm()}
  </Layout>
);

export default Signup;
