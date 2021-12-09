import {
  Switch,
  Route,
} from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import NoMatch from "./NoMatch";
import ProfileSite from "./ProfileSite";
import ShareSongs from "./ShareSongs";
import SearchForUsers from "./SearchForUsers";

function UserHeader(props) {
  const { loggedIn, logout, validateAccess } = props;
  // const [token, setToken] = useState("");

  return (
    <div>
      <Header
        validateAccess={validateAccess}
        logout={logout}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile-site">
          <ProfileSite />
        </Route>
        {/* Switch react doc: All children of a <Switch> should be <Route> or <Redirect> elements. Cannot be wrapped in <>..</> Should be fixed  */}
        {validateAccess === "user" ? (
          <Route path="/profileSite">
            <ProfileSite />
          </Route>
        ) : (
          ""
        )}
        {validateAccess === "user" ? (
          <Route path="/search-for-users">
            <SearchForUsers />
          </Route>
        ) : (
          ""
        )}

        {validateAccess === "user" ? (
          <Route path="/shareSongs">
            <ShareSongs />
          </Route>
        ) : (
          ""
        )}
        {validateAccess === "admin" ? (
          <Route path="/fetch-parallelly">
           
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
