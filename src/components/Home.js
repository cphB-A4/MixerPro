import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Container>
        <Row className="rows">
          <Col xs={2} className="columns"></Col>
          <Col className="columns">
            <h1 className="text-center mt-3">MixerPro</h1>
            <br></br>
            <h3>
              <strong>Functionalities</strong>
            </h3>
            <p>
              <strong>No Login</strong>: Home, FetchSingle and Login
            </p>
            <p>
              <strong>User</strong> : Home, FetchSingle, FetchSequentially and
              Logout
            </p>
            <p>
              <strong>Admin</strong>: Home, FetchSingle, FetchParallel and
              Logout
            </p>
            <br></br>
          </Col>
          <Col xs={2} className="columns"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
