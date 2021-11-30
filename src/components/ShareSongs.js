import { Typeahead } from "react-bootstrap-typeahead";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import DisplaySongs from "./DisplaySongs";


function ShareSongs() {
 
    const [songsSelection, setSongsSelection] = useState("");
    //needs token to request
    const [token, setToken] = useState("");
    const [tracks, setTracks] = useState("");
      const [options, setOptions] = useState("");


    const handleOnChange = (evt) => {
      evt.preventDefault();
    setSongsSelection(evt.target.value);
    };

     const handleSubmit = (evt) => {
       evt.preventDefault();
       //every time user types something the suggestions (LIMIT 5) changes
       //api keys
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
         //fetch 5 tracks based on userInput
         axios(
           `https://api.spotify.com/v1/search?q=${songsSelection}10&type=track`,
           {
             method: "GET",
             headers: {
               Authorization: "Bearer " + tokenResponse.data.access_token,
             },
           }
         ).then((tracksResponse) => {
           setTracks(tracksResponse);
                setOptions(tracksResponse)
           console.log(tracksResponse);
         });
       });
     };

  return (
    <div>
      <p>Share songs</p>
      <Form.Group style={{ marginTop: "20px" }}>
        <Form.Label>Select song to share</Form.Label>
        <form onChange={handleOnChange}>
          <input value={songsSelection} />
          <button className="btn btn-black mt-2" onClick={handleSubmit}>
            Search For Songs to Post
          </button>
        </form>
      </Form.Group>
      {tracks !== "" ? <DisplaySongs tracks={tracks} /> : ""}
    </div>
  );
}

export default ShareSongs;
