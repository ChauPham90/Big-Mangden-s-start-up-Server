import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { signout } from "../state/auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  }
};
const Menu = ({ history }) => (
  <div>
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link
          href="/home"
          eventKey="link-1"
          style={isActive(history, "/home")}
        >
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/signin"
          eventKey="link-2"
          style={isActive(history, "/signin")}
        >
          Sign In
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/signup"
          eventKey="link-3"
          style={isActive(history, "/signup")}
        >
          Sign Up
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <span
          href="/signout"
          eventKey="link-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            signout(() => {
              console.log("clicked");
              history.push("");
            });
          }}
        >
          Sign Out
        </span>
      </Nav.Item>
    </Nav>
  </div>
);

export default withRouter(Menu);
