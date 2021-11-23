import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import FetchSingle from "./FetchSingle";
import FetchSequentially from "./FetchSequentially";
import FetchParallel from "./FetchParallelly";
import FetchParallelly from "./FetchParallelly";
import NoMatch from "./NoMatch";
import axios from "axios";

function UserHeader(props) {
  const { loggedIn, logout, validateAccess } = props;
  const [token, setToken] = useState("");

  useEffect(() => {
    var clientId = process.env.REACT_APP_CLIENT_ID;
    var clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
      console.log(tokenResponse.data.access_token);
    });
  }, []);

  return (
    <div>
      <Header
        validateAccess={validateAccess}
        logout={logout}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home token={token} />
        </Route>
        <Route path="/fetch-single">
          <FetchSingle />
        </Route>

        {validateAccess === "user" ? (
          <Route path="/fetch-sequentially">
            <FetchSequentially />
          </Route>
        ) : (
          ""
        )}
        {validateAccess === "admin" ? (
          <Route path="/fetch-parallelly">
            <FetchParallelly />
          </Route>
        ) : (
          ""
        )}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default UserHeader;
