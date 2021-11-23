import React, { useState, useEffect } from "react";
import axios from "axios";
function RandomSong({ token }) {
  const [tracks, setTracks] = useState({});

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
      /*   setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items
      })*/
      console.log("song name: " + tracksResponse.data.tracks.items[0].name);
      console.log("Artist name: " + tracksResponse.data.tracks.items[0].artists[0].name);
      console.log(
        "album cover img: " +
          tracksResponse.data.tracks.items[0].album.images[0].url
      );
      console.log(
        "link til spotify sang: " +
          tracksResponse.data.tracks.items[0].external_urls.spotify
      );

     
     // setTracks()
      
      console.log(tracksResponse);
      //console.log(tracksResponse.data.name);
    });
  };

  return (
    <div>
      <button onClick={getRandomSong}>click me</button>
    </div>
  );
}

export default RandomSong;
