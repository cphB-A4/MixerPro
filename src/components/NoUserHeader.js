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
import FetchSingle from "./ProfileSite";
import NoMatch from "./NoMatch";
import ErrorToDisplay from "./ErrorToDisplay";
import Logo from "../images/mixerProLogo.jpg";
import facade from "../apiFacade";

function NoUserHeader(props) {
  const { login, loggedIn, errorMsg } = props;
  const init = { username: "", password: "" };
    const initRegister = { newUsername: "", newPassword: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const[toggle, setToggle] = useState(false);
  const [registerCredentials, setRegisterCredentials] = useState(initRegister);
const [registerError, setRegisterError] = useState(null);
const [showRegisterError, setShowRegisterError] = useState(false);

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

  const handleChangeRegister = (evt) => {
    setRegisterCredentials({...registerCredentials,[evt.target.id] : evt.target.value})
  } 

  const handleRegister = (evt) => {
    evt.preventDefault();
    console.log(registerCredentials);
    facade.registerUser(registerCredentials).then((res) => {
      console.log('success')
      console.log(res)
    }).catch((err) => {
           console.log(err);
           if (err.status) {
             err.fullError.then((e) => {
               console.log(e.code + ": " + e.message);
               setShowRegisterError(true)
                  setRegisterError(e.message);
            
             });
           } else {
             console.log("Network error");
             //setSuccess(true);
           }
         });
  }
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
                  <button
                    type="submit"
                    class="btn btn-black"
                    onClick={(evt) => {
                      evt.preventDefault();
                      setToggle(true);
                    }}
                  >
                    Register
                  </button>
                  {errorMsg ? <ErrorToDisplay errorMsg={errorMsg} /> : ""}
                </Form>
              </Col>
              <Col xs={2} className="columns"></Col>
            </Row>
          </Container>
          {console.log(toggle)}
          {toggle ? (
            <Container>
              <Row className="rows">
                <Col className="columns login-form">
                  <Form onChange={handleChangeRegister}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        placeholder="Enter username"
                        id="newUsername"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        id="newPassword"
                      />
                    </Form.Group>
                    <button
                      type="submit"
                      class="btn btn-black"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    {showRegisterError ? (
                      <ErrorToDisplay errorMsg={registerError} />
                    ) : (
                      ""
                    )}
                  </Form>
                </Col>
              </Row>
            </Container>
          ) : (
            ""
          )}
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
