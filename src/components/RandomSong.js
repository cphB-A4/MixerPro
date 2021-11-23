import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplaySongs from "./DisplaySongs";
function RandomSong() {
  const [tracks, setTracks] = useState("");
  const [token, setToken] = useState("");


   useEffect(() => {
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
       //console.log(tokenResponse.data.access_token);
        const randomWildcard = getRandomSearch();
        //console.log(randomWildcard);
        //fetch 20 random tracks
        axios(
          `https://api.spotify.com/v1/search?q=${randomWildcard}25&type=track`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + tokenResponse.data.access_token,
            },
          }
        ).then((tracksResponse) => {
          setTracks(tracksResponse);
          //console.log(tracksResponse);
        });
     });

   }, []);

  function getRandomSearch() {
    // A list of all characters that can be chosen.
    const characters = "abcdefghijklmnopqrstuvwxyz";

    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    let randomSearch = "";
    randomSearch = randomCharacter + "%";
    return randomSearch;
  }
  return (
    <div>
      {tracks !== "" ? <DisplaySongs tracks={tracks} /> : ""}
    </div>
  );
}

export default RandomSong;
