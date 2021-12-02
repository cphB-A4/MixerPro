import { Table } from "react-bootstrap";

function Post({ track, addPostChangeState, setSongDescription }) {
  /*
    name: "",
      artist: "",
      coverUrl: "",
      spotifyLinkUrl: ""
    */

      const handleSongsDescription = (evt) => {
 setSongDescription(evt.target.value);
      }
  return (
    <div>
      {/* <p>{JSON.stringify(track)}</p> */}
      <div className="share-songs-post">
        <Table striped>
            <tbody>
          <tr>
              <td>
            <a href={track.spotifyLinkUrl}>
              <img
                className="resize-img"
                alt="album cover"
                height="200"
                width="200"
                src={track.coverUrl}
              />
            </a>
            </td>

            <td>
              Track:
              <a className="text-dark" href={track.spotifyLinkUrl}>
                <strong>{track.name}</strong>
              </a>
            </td>
            <td>
              Song: <strong>{track.artist} </strong>
            </td>
          </tr>
          </tbody>
        </Table>
        <textarea onChange={handleSongsDescription} className="text-area-post"></textarea>
        <button
          onClick={() => {
            addPostChangeState(true);
       
          }}
          className="btn btn-black"
        >
          Add post
        </button>
      </div>
    </div>
  );
}

export default Post;