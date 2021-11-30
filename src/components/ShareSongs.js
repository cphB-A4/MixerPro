import { Typeahead } from "react-bootstrap-typeahead";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Form } from "react-bootstrap";
import DisplaySongs from "./DisplaySongs";
import DisplaySongsInForm from "./DisplaySongsInForm";


function ShareSongs() {
 
    const [songsSelection, setSongsSelection] = useState("");
    //needs token to request
    const [token, setToken] = useState("");
    const [tracks, setTracks] = useState("");
      const [options, setOptions] = useState("");
    //   const[trackId, setTrackId] = useState("");//To retreive track from DisplaySongsInForm component

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
      },[])


    const handleOnChange = (evt) => {
      evt.preventDefault();
    setSongsSelection(evt.target.value);
     axios(
       `https://api.spotify.com/v1/search?q=${songsSelection}10&type=track&limit=8`,
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

      {tracks !== "" ? (
        <DisplaySongsInForm
          tracks={tracks}
          
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ShareSongs;
