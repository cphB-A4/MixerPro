import jwt_decode from "jwt-decode";
import { URL, localURL } from "./Settings";

//URL = "https://www.theagns.com/CA2-Backend";
function handleHttpErrors(res) {
  if (!res.ok) {
    console.log( res)
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  console.log(res)
  return res.json();
}

function handleError(error, setError) {
  if (error.status) {
    error.fullError.then((data) => setError(data));
  } else {
    setError({ code: 500, message: "Some unknown error happened" });
  }
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const getUsername = () => {
    var decoded = jwt_decode(getToken());
       const { username } = decoded;
       return username;
  }

  //Decode token

  const validateAccess = () => {
    var decoded = jwt_decode(getToken());
    const { roles } = decoded;
    //console.log(roles);
      console.log(decoded);
    return roles;
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };


  const getUsersFavouriteGenres = (username) => {
    const options = makeOptions("GET",true);
    return fetch(localURL + "api/info/userGenres/" + username, options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  }

  const addGenreToPerson = (username, genres) => {
    console.log("username: " + username)
    console.log("genres as JSON String : " + genres)
     const options = makeOptions("PUT", true, genres);
     console.log("options body " +options)
      return fetch(
        localURL + "/api/info/" + username,
        options
      )
        .then(handleHttpErrors)
        .then((res) => {
          setToken(res.token);
        });
  }

  const login = (user, password) => {
    /*TODO*/
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    console.log("login options: " + options)
    return fetch(localURL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };
  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(localURL + "/api/info/user", options).then(handleHttpErrors);
  };

  //Fetches from one endpoint. Only 1 external api call.
  const fetchSingleData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(localURL + "/api/info/fetchSingle", options).then(handleHttpErrors);
  };
  //Fetches from one endpoint. 4 external api call.
  const fetchAlotData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(localURL + "/api/info/fetchSeq", options).then(handleHttpErrors);
  };

  const fetchAlotDataParallel = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(localURL + "/api/info/fetchParallel", options).then(
      handleHttpErrors
    );
  };
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }

    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    fetchSingleData,
    fetchAlotData,
    fetchAlotDataParallel,
    validateAccess,
    handleError,
    getUsername,
    addGenreToPerson,
    getUsersFavouriteGenres,
  };
}
const facade = apiFacade();
export default facade;
