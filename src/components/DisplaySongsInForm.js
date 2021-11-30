 import { Col, Container, Row, Table } from "react-bootstrap";
 import React, { useState, useEffect } from "react";
 function DisplaySongsInForm({ tracks }) {
  //console.log(tracks);
  //console.log(tracks.data.tracks.items);
  const[trackId, setTrackId] = useState("")

  return (
    <Table striped bordered hover>
      {console.log(trackId)}
      {
        <>
          <thead>
            <tr>
              <th>Add Song</th>
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
                    onClick={() => setTrackId(track.id)}
                    className="btn btn-black"
                  >
                    Add
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