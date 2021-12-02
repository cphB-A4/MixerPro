import { Card, CardGroup } from "react-bootstrap";
//import { Col, Container, Row } from "react-bootstrap";

function DisplaySongs({ tracks }) {
  //console.log(tracks);
  //console.log(tracks.data.tracks.items);

  return (
    <div>
      {
        <ul>
          {tracks.data.tracks.items.map((track, index) => (
            <li key={track.external_urls.spotify}>
              <CardGroup>
                <Card>
                  <a href={track.external_urls.spotify}>
                    <Card.Img
                      variant="center"
                      className="album-cover img-fluid "
                      src={track.album.images[0].url}
                    />
                  </a>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>{track.name}</Card.Title>
                    <Card.Text>{track.artists[0].name}</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default DisplaySongs;
