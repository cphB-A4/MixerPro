function DisplayPosts({posts}) {
    return (
      <>
      <h1 className="text-center mb-4">Your Posts</h1>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <div className="share-songs-post mb-4">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <a href={post.spotifyLinkUrl}>
                          <img
                            className="resize-img"
                            alt="album cover"
                            height="200"
                            width="200"
                            src={post.coverUrl}
                          />
                        </a>
                      </td>

                      <td>
                        Track:
                        <a className="text-dark" href={post.spotifyLinkUrl}>
                          <strong>{post.track}</strong>
                        </a>
                      </td>
                      <td>
                        Song: <strong>{post.artist} </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div id="post-description" className="text-center mt-3">
                  {post.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
}

export default DisplayPosts;