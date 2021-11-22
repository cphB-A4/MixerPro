import { Col, Container, Row } from "react-bootstrap";
import Logo from "../images/mixerProLogo.jpg";
import RandomSong from "./RandomSong";

function Home() {
  return (
    <div>
      <Container>
        <Row className="rows">
          <Col xs={2} className="columns"></Col>
          <Col className="columns">
            <img
              src={Logo}
              alt="Logo"
              className="mt-3 rounded-circle resize mx-auto d-block"
            />
            <br></br>
            <h3 className="text-center">
              Music based on <strong>your</strong> liking
            </h3>

            <RandomSong />
          </Col>
          <Col xs={2} className="columns"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
