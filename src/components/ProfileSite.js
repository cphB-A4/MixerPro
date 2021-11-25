import facade from "../apiFacade";
import React, { useState, useEffect } from "react";
import { ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap";
import ErrorToDisplay from "./ErrorToDisplay";
import Logo from "../images/mixerProLogo.jpg";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";

function ProfileSite() {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [username, setUsername] = useState('none');
  const [genres, setGenres] = useState("");

  const [multiSelections, setMultiSelections] = useState([]);


  useEffect(() => {
    setUsername(facade.getUsername);
    
    axios(
      `http://localhost:8080/Spotify_Backend_war_exploded/api/info/genres`,
      
      
    ).then((data) => {
      const options = data.data.map((genre) => ({ name: genre.name }));
      console.log(options)
      setGenres(options);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <Container>
        <Row className="rows">
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
                  <button type="submit" className="btn btn-black mt-3">
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
        {error && (
          <ErrorToDisplay errorMsg={error.message} errorCode={error.code} />
        )}
      </Container>
    </div>
  );
}

export default ProfileSite;
