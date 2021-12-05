import facade from "../apiFacade";
import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import ErrorToDisplay from "./ErrorToDisplay";
import DisplayPosts from "./DisplayPosts"
import Logo from "../images/mixerProLogo.jpg";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";
import SuccesToDisplay from "./SuccessToDisplay";
import GifModal from "./GifModal";

function ProfileSite() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [username, setUsername] = useState("none");
  const [genres, setGenres] = useState("");
  const [userGenres, setUserGenres] = useState([]);
  const[userDescription, setUserDescription] = useState(''); //handle input when updating description
  const[showUserDescription, setShowUserDescription] = useState(''); //display the users current description ('No description yet' if user has no description (only on user side))

  //for editing description
  const [toggle, setToggle] = useState(true);

  const [multiSelections, setMultiSelections] = useState([]);

  //state for posts 
  const[showPosts, setShowPosts] = useState(false);
  const intalStatePost= {}
  const [posts, setPosts] = useState([])
  const [gifs, setGifs] = useState('')
  const [displayGifImg, setDisplayGifImg] = useState("");
  const [gifFromServer, setGifFromServer] = useState("")

  //every time user updates gif profile image

  const updateProfileGifUrlDb = (gifUrl) => {
facade
  .updateProfileGifUrl(gifUrl)
  .then((res) => {
  
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
    }
  });
  }

  useEffect(() => {

    facade
      .getProfileGifUrlById(facade.getUsername())
      .then((res) => {
        setDisplayGifImg(res.profileGifUrl);
        console.log(res.profileGifUrl)
        //setGifFromServer();
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
        }
      });


    facade
      .getTrendingGifs()
      .then((res) => {
        setGifs(res);
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
        }
      });
    facade
      .getAllPostsByUsername(facade.getUsername())
      .then((res) => {
        //retrieve all posts made by the user
        let tmpPost = res.map((post) => ({
          artist: post.artist,
          coverUrl: post.coverUrl,
          description: post.description,
          spotifyLinkUrl: post.spotifyLinkUrl,
          track: post.track,
        }));
        //console.log(tmpPost);
        setPosts(tmpPost);
        //fires the DisplayPosts component
        setShowPosts(true);
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
        }
      });

    setUsername(facade.getUsername);
    

    facade.getUsersDescriptionById(facade.getUsername())
    .then((res) => {
  //Set profile description from db
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
     
      setGenres(options);
    });

    // setUserGenres(facade.getUsersFavouriteGenres(facade.getUsername))
    axios(
      `http://localhost:8080/Spotify_Backend_war_exploded/api/info/userGenres/${facade.getUsername()}`
    ).then((userGenres) => {
      //console.log(userGenres.data);
      if(userGenres.data == null){
setUserGenres([])
      } else {
 setUserGenres(userGenres.data);
      }
     
    });
  }, []);


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
  setUserDescription('')
  setToggle(true);
  setShowUserDescription(userDescription)
  //setUserDescription()
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
      <Container>
        <Row className="rows">
          <Col xs={2} className="columns"></Col>
          <Col className="columns text-center">
            <h1 className="text-center mt-3">
              Welcome <strong>{username}</strong>
            </h1>
            {displayGifImg === "No profile gif url yet." ? (
              <img
                src={Logo}
                alt="Logo"
                className="mt-3 rounded-circle resize mx-auto d-block"
              />
            ) : (
              <img
                src={displayGifImg}
                alt="gif"
                className="mt-3 rounded-circle resize mx-auto d-block"
                height="150"
                width="150"
              />
            )}

            {gifs !== "" ? (
              <GifModal
                updateGifUrlDb={updateProfileGifUrlDb}
                changeGifImg={setDisplayGifImg}
                gifList={gifs}
              />
            ) : (
              <p>Loading..</p>
            )}

            <p>My Description (double click to edit):</p>

            {toggle ? (
              <p
                id="description-text"
                onDoubleClick={() => {
                  //showUserDescription is the users current description
                  setUserDescription(showUserDescription);
                  setToggle(false);
                }}
              >
                {showUserDescription}
              </p>
            ) : (
              <>
                <textarea
                  onChange={onChangeDescription}
                  value={userDescription}
                />
                <button
                  className="btn btn-black mt-2"
                  onClick={updateDescription}
                >
                  Update description
                </button>
              </>
            )}

            <p>My favourite Genres:</p>

            {userGenres !== null ? (
              <>
                <ul>
                  {userGenres.map((genre, index) => (
                    <li key={index}>
                      <div type="button" className="btn btn-outline-dark ">
                        {genre}
                        <button
                          key={genre}
                          onClick={() => handleDeleteGenreFromUser(genre)}
                          className="btn-close active"
                        ></button>
                      </div>{" "}
                    </li>
                  ))}
                </ul>{" "}
              </>
            ) : (
              <p>No genres chosen</p>
            )}

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
                    placeholder="Add genres ..."
                    selected={multiSelections}
                  />
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-black mt-3 mb-5"
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
        {showPosts && <DisplayPosts posts={posts} />}
        
      </Container>
    </div>
  );
}

export default ProfileSite;
