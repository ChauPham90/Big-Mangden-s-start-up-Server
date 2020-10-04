import React from "react";
import Layout from "../core/Layout";

console.log(process.env.REACT_APP_API_URL);

const Signup = () => (
  <Layout
    title="Sign up Page"
    description=" Sign up to Node React Big Mang Den App"
    children={process.env.REACT_APP_API_URL}
  >
    {process.env.REACT_APP_API_URL}
  </Layout>
);

export default Signup;
