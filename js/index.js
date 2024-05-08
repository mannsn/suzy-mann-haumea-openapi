//Randomly generate an id for the artwork - note the id may not exist   TBD figure out a better way
const randomId = Math.floor(Math.random() * 100 + 2000);
console.log(randomId);
const url = `https://api.artic.edu/api/v1/artworks/${randomId}`;
console.log(url);

//fetch the url and if the data exists for the id, get info about the artwork and the art
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json(); // Parse the response as JSON
  })

  //Artwork was found!
  .then((data) => {

    //Get info about artwork
    console.log(data);
    const artwork = data.data;
    console.log(artwork);
    const title = artwork.title;
    console.log(artwork.title);
    const artistTitle = artwork.artist_title;
    console.log(artistTitle);
    const artworkImageID = artwork.image_id;
    console.log(artworkImageID);

    //Add the title to the html
    const artworkTitle = document.getElementById("artworkTitle");
    console.log(artworkTitle);
    artworkTitle.innerHTML = `Title: ${title}`;

    //If artist information is available, then add it to the html
    if (artistTitle != null) {
      const artistTitleElement = document.getElementById("artistTitleId");
      console.log(artistTitleElement);
      artistTitleElement.innerHTML = `Artist: ${artistTitle}`;
    }
    
    //Get the artwork image for the image id
    artworkSrcString = `https://www.artic.edu/iiif/2/${artworkImageID}/full/843,/0/default.jpg`;
    console.log(artworkSrcString);

    //Add it to the img block
    const artworkImage = document.getElementById("artworkImage");
    artworkImage.setAttribute("src", artworkSrcString);

    console.log(artworkSrcString);
  })
  .catch((error) => {
    console.error(`Image ${randomId} not found`, error);
  });
