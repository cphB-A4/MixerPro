import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink,
  useHistory,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import Home from "./Home";
import Header from "./Header";
import FetchSingle from "./FetchSingle";
import NoMatch from "./NoMatch";

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
      {console.log(errorMsg)}
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <div>
            <h2>Login</h2>
            <form onChange={onChange}>
              <input placeholder="User Name" id="username" />
              <input placeholder="Password" id="password" />
              <button onClick={handleSubmit}>Login</button>
            </form>
            <p>{errorMsg}</p>
          </div>
        </Route>
        <Route path="/fetch-single">
          <FetchSingle />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default NoUserHeader;
