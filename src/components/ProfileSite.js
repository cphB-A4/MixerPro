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
  const[userDescription, setUserDescription] = useState('');
  const[showUserDescription, setShowUserDescription] = useState('');

  const [multiSelections, setMultiSelections] = useState([]);

  useEffect(() => {
    setUsername(facade.getUsername);
    

    facade.getUsersDescriptionById(facade.getUsername())
    .then((res) => {
      console.log(res)
setShowUserDescription(res.userDescription);
    }).catch((err) => {
        
        console.log(err);
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e.code + ": " + e.message);
            setSuccess(false);
            setError(e.message);
          });
        } else {
          console.log("Network error");
        }
      });

    
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
      `http://localhost:8080/Spotify_Backend_war_exploded/api/info/userGenres/${facade.getUsername()}`
    ).then((userGenres) => {
      console.log(userGenres.data);
      setUserGenres(userGenres.data);
    });
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

     // deleteGenreFromUser;

     function handleDeleteGenreFromUser(genre) {
       facade
         .deleteGenreFromUser(genre)
         .then((res) => {
           setError("");
           const tmpGenres = [...userGenres];
           var filteredGenres = tmpGenres.filter((e) => e !== genre);
           setUserGenres(filteredGenres)
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
     }

     const updateDescription = (evt) => {
        evt.preventDefault();
facade.updateUserDescription(userDescription).then((res) => {
  setSuccess(true);
  console.log("update description for user. success");
  setUserDescription('')
}).catch((err) => {
        
        console.log(err);
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e.code + ": " + e.message);
            setSuccess(false);
            setError(e.message);
          });
        } else {
          console.log("Network error");
        }
      });
     }

     const onChangeDescription = (evt) => {
       //console.log(evt.target.value)
       setUserDescription(evt.target.value);
     }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // const multiSelectionsString = JSON.stringify(multiSelections);
    facade
      .addGenreToPerson(username, multiSelections)
      .then((res) => {
        setError("");
        const tmpGenres = [...userGenres];
        //multiSelections has key. userGenres dont:
        let extractedValues = multiSelections.map((genre) => genre.name);
        //puts multiselctions array onto the users current favourite generes array.
         const result = tmpGenres.concat(extractedValues);
        
          setUserGenres(result);
        // console.log(multiSelections)
         setMultiSelections([])
        // console.log(multiSelections);
      })
      .catch((err) => {
        setMultiSelections([]);
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
      {console.log(showUserDescription)}
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

            <p>My Description:</p>
            <p>{showUserDescription}</p>

            <p>My favourite Genres:</p>

            {userGenres.map((genre) => (
              <button type="button" className="btn btn-outline-dark ">
                {genre}
                <button
                  key={genre}
                  onClick={() => handleDeleteGenreFromUser(genre)}
                  className="btn-close active"
                ></button>
              </button>
              // <span class="tag label label-info">
              //   <span>Example Tag</span>
              //   <a>
              //     <i class="remove glyphicon glyphicon-remove-sign glyphicon-white"></i>
              //   </a>
              // </span>
              //  <input type="text" value={genre} data-role="tagsinput "/>
            ))}

            {genres !== "" ? (
              <>
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
            <form onChange={onChangeDescription}>
              <br></br>
              {console.log(userDescription)}
              <input value={userDescription} />
              <button onClick={updateDescription}>Update description</button>
            </form>
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
