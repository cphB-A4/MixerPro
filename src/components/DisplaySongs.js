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
  console.log(tracks.data.tracks);

  return (
    <div>
      {/* { <ul>
        {tracks.data.tracks.map((track) => (
          <li key={track.name}>{track}</li>
        ))}
      </ul> } */}
    </div>
  );
}

export default DisplaySongs;
