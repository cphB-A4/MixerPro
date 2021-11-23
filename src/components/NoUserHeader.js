import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink,
  useHistory,
} from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import Home from "./Home";
import Header from "./Header";
import FetchSingle from "./FetchSingle";
import NoMatch from "./NoMatch";
import ErrorToDisplay from "./ErrorToDisplay";
import Logo from "../images/mixerProLogo.jpg";

function NoUserHeader(props) {
  const { login, loggedIn, errorMsg } = props;
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
    //redirects user to home page
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };
  return (
    <div>
      {/* <Header loggedIn={loggedIn} /> */}

      <Switch>
        <Route exact path="/">
          <Container>
            <Row className="rows">
              <Col sm={5} className="columns main-left">
                <h1 className="text-center mt-3">MixerPro</h1>
                <img className="logo-mixerpro" src={Logo} alt="Logo" />
                <p>Login and share music </p>
              </Col>
              <Col className="columns login-form">
                <Form onChange={onChange}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter username" id="username" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      id="password"
                    />
                  </Form.Group>

                  <button
                    type="submit"
                    class="btn btn-black"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  {errorMsg ? <ErrorToDisplay errorMsg={errorMsg} /> : ""}
                </Form>
              </Col>
              <Col xs={2} className="columns"></Col>
            </Row>
          </Container>
        </Route>
        {/* <Route path="/fetch-single">
          <FetchSingle />
        </Route> */}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default NoUserHeader;
