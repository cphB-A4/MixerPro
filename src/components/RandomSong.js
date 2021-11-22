function RandomSong() {
  function getRandomSearch() {
    // A list of all characters that can be chosen.
    const characters = "abcdefghijklmnopqrstuvwxyz";

    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    let randomSearch = "";

    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter + "%";
        break;
      case 1:
        randomSearch = "%" + randomCharacter + "%";
        break;
      default:
        randomSearch = 0;
        break;
    }
    console.log(randomSearch);
    return randomSearch;
  }

  return (
    <div>
      <button onClick={getRandomSearch}>click me</button>
    </div>
  );
}

export default RandomSong;
