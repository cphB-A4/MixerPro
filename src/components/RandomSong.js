import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplaySongs from "./DisplaySongs";
function RandomSong({ token }) {
  const [tracks, setTracks] = useState("");

   useEffect(() => {
     getRandomSong()
    
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

  const getRandomSong = (evt) => {
    console.log(token);
    const randomWildcard = getRandomSearch();
    console.log(randomWildcard);
    axios(
      `https://api.spotify.com/v1/search?q=${randomWildcard}25&type=track`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((tracksResponse) => {
      setTracks(tracksResponse)
      console.log(tracksResponse);

    });
  };

  return (
    <div>
      
      {tracks!=="" ?<DisplaySongs tracks={tracks}/> : ""}
    </div>
  );
}

export default RandomSong;
