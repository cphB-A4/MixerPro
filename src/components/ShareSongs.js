import { Typeahead } from "react-bootstrap-typeahead";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Form } from "react-bootstrap";
import DisplaySongs from "./DisplaySongs";
import DisplaySongsInForm from "./DisplaySongsInForm";
import Post from "./Post";
import facade from "../apiFacade";
import SuccesToDisplay from "./SuccessToDisplay";
import ErrorToDisplay from "./ErrorToDisplay";


function ShareSongs() {
  const [songsSelection, setSongsSelection] = useState("");
  //needs token to request
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState("");
  const [options, setOptions] = useState("");
   const [error, setError] = useState();
   const [success, setSuccess] = useState();
  //   const[trackId, setTrackId] = useState("");//To retreive track from DisplaySongsInForm component
  const [postSong, setPostSong] = useState(false);
  const [songDescription, setSongDescription] = useState("");
  const initTrack = {
    trackId: -1,
    name: "",
    artist: "",
    coverUrl: "",
    spotifyLinkUrl: "",
  };
  const [trackToSave, setTrackToSave] = useState(initTrack);

  useEffect(() => {
    var clientId = process.env.REACT_APP_CLIENT_ID;
    var clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    //Get the token from the keys
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
    });
  }, []);

  const handleOnChange = (evt) => {
    evt.preventDefault();
    setSongsSelection(evt.target.value);
    axios(
      `https://api.spotify.com/v1/search?q=${songsSelection}&type=track&limit=8`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((tracksResponse) => {
      setTracks(tracksResponse);
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };


  //Happens everytime user posts a song
  const addPost = () => {
    //add to db + sucess or error msg

    let tmpPost = trackToSave;
    //adds the description the to the selected song in the post
    tmpPost.description = songDescription;
    console.log(tmpPost);
    facade
      .addPost(tmpPost)
      .then((res) => {
        console.log(res);
         setSuccess(true);
        //after submit
        setTrackToSave(initTrack);
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

    setPostSong(false);
    
  };

  return (
    <>
      <h1 className="text-center mt-3">Share songs</h1>

      <form onChange={handleOnChange}>
        <input
          className="form-control"
          placeholder="Search..."
          value={songsSelection}
        />
      </form>

      {console.log("trackId: " + JSON.stringify(trackToSave))}
      {tracks !== "" ? (
        <DisplaySongsInForm
          tracks={tracks}
          changeTracksState={setTracks}
          stateChanger={setTrackToSave}
        />
      ) : (
        ""
      )}
      {trackToSave.trackId === -1 ? (
        <p>TrackToSave id != -1</p>
      ) : (
        <>
          {" "}
          <Post
            addPostChangeState={setPostSong}
            track={trackToSave}
            setSongDescription={setSongDescription}
          />
        </>
      )}
      {/* when user click 'postSong' in Post component the postSong state is true and the function addPost() submits the post to db */}
      {postSong ? <>{addPost()}</> : ""}
      {error && <ErrorToDisplay errorMsg={error} />}
      {success && <SuccesToDisplay msg={"Successfully posted. Check your Site"} />}
    </>
  );
}

export default ShareSongs;
