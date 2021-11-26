import facade from "../apiFacade";
import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import ErrorToDisplay from "./ErrorToDisplay";
import Logo from "../images/mixerProLogo.jpg";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import SuccesToDisplay from "./SuccessToDisplay";

function ProfileSite() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [username, setUsername] = useState("none");
  const [genres, setGenres] = useState("");
  const [userGenres, setUserGenres] = useState([]);

  const [multiSelections, setMultiSelections] = useState([]);

  useEffect(() => {
    setUsername(facade.getUsername);

    axios(
      `http://localhost:8080/Spotify_Backend_war_exploded/api/info/genres`
    ).then((data) => {
      const options = data.data.map((genre) => ({ name: genre.name }));
      console.log(options);
      setGenres(options);
      console.log(data);
    });

    // setUserGenres(facade.getUsersFavouriteGenres(facade.getUsername))
    axios(
      `http://localhost:8080/Spotify_Backend_war_exploded/api/info/userGenres/user`
    ).then((data) => {
      console.log(data);
    })

  
  }, []);

  /*
   facade
      .login(user, pass)
      .then((res) => {
        //If user login succesfully it redirects to homepage
        setLoggedIn(true);
        setErrorMsg("");
        const path = `/`;
        history.push(path);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e.code + ": " + e.message);
            setErrorMsg(e.code + ": " + e.message);
          });
        } else {
          console.log("Network error");
        }
      });
  */

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // const multiSelectionsString = JSON.stringify(multiSelections);
    facade
      .addGenreToPerson(username, multiSelections)
      .then((res) => {
        setError("");
        console.log("hello");
      })
      .catch((err) => {
        console.log(err);
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e.code + ": " + e.message);
            setSuccess(false);
            setError(e.message);
          });
        } else {
          console.log("Network error");
          setSuccess(true);
        }
      });
    //redirects user to home page
  };

  return (
    <div>
      <Container>
        <Row className="rows">
          {console.log(userGenres)}
          <Col xs={2} className="columns"></Col>
          <Col className="columns text-center">
            <h1 className="text-center mt-3">
              Welcome <strong>{username}</strong>
            </h1>
            <img
              src={Logo}
              alt="Logo"
              className="mt-3 rounded-circle resize mx-auto d-block"
            />

            {genres !== "" ? (
              <>
                {console.log(multiSelections)}
                <Form.Group style={{ marginTop: "20px" }}>
                  <Form.Label>Select Genres</Form.Label>
                  <Typeahead
                    id="basic-typeahead-multiple"
                    className="test"
                    labelKey="name"
                    multiple
                    onChange={setMultiSelections}
                    options={genres}
                    placeholder="Update genres ..."
                    selected={multiSelections}
                  />
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-black mt-3"
                  >
                    Update Genre(s)
                  </button>
                </Form.Group>
              </>
            ) : (
              <p>loading...</p>
            )}
          </Col>
          <Col xs={2} className="columns"></Col>
        </Row>
        {error && <ErrorToDisplay errorMsg={error} />}
        {success && <SuccesToDisplay msg={"Successfully added"} />}
      </Container>
    </div>
  );
}

export default ProfileSite;
