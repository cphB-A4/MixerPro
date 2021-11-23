import Button from "@restart/ui/esm/Button";
import { Card, CardGroup } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";

function DisplaySongs({ tracks }) {
  //   console.log("song name: " + tracks.data.tracks.items[0].name);
  //   console.log("Artist name: " + tracks.data.tracks.items[0].artists[0].name);
  //   console.log(
  //     "album cover img: " + tracks.data.tracks.items[0].album.images[0].url
  //   );
  //   console.log(
  //     "link til spotify sang: " +
  //       tracks.data.tracks.items[0].external_urls.spotify
  //   );

  console.log(tracks);
  console.log(tracks.data.tracks.items);

  return (
    <div>
      {
        <ul>
          {tracks.data.tracks.items.map((track, index) => (
            <>
             
                  <CardGroup>
                    <Card>
                      <Card.Body>
                        <Card.Title>{track.name}</Card.Title>
                        <Card.Text>{track.artists[0].name}</Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <a href={track.external_urls.spotify}>
                        <Card.Img
                          variant="center"
                          className="album-cover img-fluid "
                          src={track.album.images[0].url}
                        />
                      </a>
                    </Card>
                  </CardGroup>
               
            </>
            // <tr>
            //   <td>{track.name}</td>
            //   <td>{track.artists[0].name}</td>
            //   <td>
            //     <a href={track.external_urls.spotify}>
            //       <img
            //         className="album-cover"
            //         alt="album cover"
            //         src={track.album.images[0].url}
            //       />
            //     </a>
            //   </td>
            // </tr>
          ))}
        </ul>
      }
    </div>
  );
}

export default DisplaySongs;
