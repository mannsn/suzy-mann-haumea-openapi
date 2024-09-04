const card = document.getElementById("artworkSection");
card.hidden = true;

//Callback for submit
function onFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  console.log(data);

  const searchWord = data.get("searchWord");
  console.log(searchWord);

  const searchurl = `https://api.artic.edu/api/v1/artworks/search?q=${searchWord}&page=4&limit=50`;
  console.log(searchurl);

  //fetch the url and if the data exists for the id, get info about the artwork and the art
  fetch(searchurl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json(); // Parse the response as JSON
    })

    //Artwork was found!
    .then((data) => {
      //Get artwork list
      console.log(data.data);
      const artworkList = [...data.data];

      console.log(artworkList);
      console.log("length = ", artworkList.length);

      //If no artwork found, use a default image
      if (length===0){
        artworkList[0].id = 129884;
      }

      //Randomly generate an index into the array to get a valid artwork id
      const randomInt = Math.floor(Math.random() * artworkList.length);
      const randomId = artworkList[randomInt].id;
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
          console.log(artworkImage);
          artworkImage.setAttribute("src", artworkSrcString);
          console.log(artworkSrcString);
          card.hidden=false;
        })
        .catch((error) => {
          console.error(`Image ${randomId} not found`, error);
        });
    })
    .catch((error) => {
      console.error(`No images were found`, error);
    });

  //Reset the form
  event.target.reset();
}

const wordForm = document.getElementById("wordFormId");
wordForm.addEventListener("submit", onFormSubmit);

