import { Col, Container, Row, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
function DisplaySongsInForm({ tracks, stateChanger, changeTracksState }) {
  //console.log(tracks);
  //console.log(tracks.data.tracks.items);
  //const[trackId, setTrackId] = useState("")
  const track = {};

  return (
    <Table striped bordered hover>
      {
        <>
          <thead>
            <tr>
              <th>Save Song</th>
              <th>Track</th>
              <th>Artist</th>
              <th>Cover</th>
            </tr>
          </thead>
          <tbody>
            {tracks.data.tracks.items.map((track, index) => (
              <tr>
                <td>
                  <button
                    className="btn btn-black"
                    onClick={() => {
                      const initTrack = {
                        trackId: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        coverUrl: track.album.images[0].url,
                        spotifyLinkUrl: track.external_urls.spotify,
                      };
                      stateChanger(initTrack);
                      changeTracksState('');//remove list of suggested tracks 
                    }}
                  >
                    Save
                  </button>
                </td>
                <td>{track.name}</td>
                <td>{track.artists[0].name}</td>
                <td>
                  <a href={track.external_urls.spotify}>
                    <img
                      className="resize-img"
                      alt="album cover"
                      height="55"
                      width="55"
                      src={track.album.images[0].url}
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      }
    </Table>
  );
}

export default DisplaySongsInForm;
