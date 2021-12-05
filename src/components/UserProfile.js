import { Col, Container, Row } from "react-bootstrap";
import DisplayPosts from "./DisplayPosts";
import Post from "./Post";

function UserProfile({ user }) {
  return (
    <Container>
      <Row className="rows">
        <Col xs={2} className="columns"></Col>
        <Col className="columns text-center">
          <h1 className="text-center mt-3">
            <strong>{user.username}</strong>'s profile
          </h1>
          {console.log(user)}
          {user.profileGifUrl === "" ? (
            ""
          ) : (
            <img
              src={user.profileGifUrl}
              alt="gif"
              className="mt-3 rounded-circle resize mx-auto d-block"
              height="150"
              width="150"
            />
          )}

          <p>Description:</p>
          <p>{user.profileDescription}</p>
          <p>favourite genres!</p>
          {user.favouriteGenres.length > 0 ? (
            <>
              <ul>
                {user.favouriteGenres.map((genre, index) => (
                  <li key={index}>
                    <div type="button" className="btn btn-outline-dark ">
                      {genre.name}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            ""
          )}

          {user.posts.length > 0 ? (
            <DisplayPosts posts={user.posts} />
          ) : (
            <p>This user has no posts yet ...</p>
          )}
        </Col>

        <Col xs={2} className="columns"></Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
