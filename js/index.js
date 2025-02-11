//Callback for radio buttons
function handleRadioChange(event) {
  event.preventDefault();
  console.log(event);

  const searchWord = document.getElementById("searchWordId").value;
  if (!searchWord) {
    alert("Please enter some text before selecting an option.");
    event.target.checked = false; // Uncheck the radio button
    return;
  }
  else{
    event.target.checked = true;
  }

  const selectedValue = event.target.value;
  console.log(`Selected option: ${selectedValue}`);
  let searchurl = '';
  const callbox = document.getElementById("callout-container");

  // search based on radio button plus search word
  if (selectedValue === "1") {
    console.log("Option 1 selected");
    searchurl = `https://api.artic.edu/api/v1/artworks/search?q=${searchWord}&query[term][is_public_domain]=true&page=1&limit=50`;
    callbox.innerHTML = `${searchWord} artwork search`;
    
  } else if (selectedValue === "2") {
    console.log("Option 2 selected");
    searchurl = `https://api.artic.edu/api/v1/artworks/search?query[match][artist_title]=${searchWord}`;
   callbox.innerHTML = `${searchWord} artist search`;
  }

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

      //Default artwork id
      let randomId = 129884;
      let artFound = false;

      //Randomly generate an index into the array to get a valid artwork id
      if (artworkList.length > 0) {
        const randomInt = Math.floor(Math.random() * artworkList.length);
        randomId = artworkList[randomInt].id;
        artFound = true;
      }

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
          const artworkDescription = artwork.artworkDescription;
          console.log(artworkDescription);
          const departmentTitle = artwork.department_title;
          console.log(departmentTitle);
          const artworkImageID = artwork.image_id;
          console.log(artworkImageID);

          //Add the title to the html
          const artworkTitle = document.getElementById("artworkTitleId");
          console.log(artworkTitle);

          if (artFound === true) {
            artworkTitle.innerHTML = `Title: ${title}`;
          } else {
            artworkTitle.innerHTML = `Title: DEFAULT ARTWORK/ ARTWORK NOT FOUND ${title}`;
          }

          //If artist information is available, then add it to the html
          if (artistTitle != null) {
            const artistTitleElement = document.getElementById("artistTitleId");
            console.log(artistTitleElement);
            artistTitleElement.innerHTML = `Artist: ${artistTitle}`;
          }

          //If artist description is available, then add it to the html
          if (artworkDescription != null) {
            const artworkDescriptionElement = document.getElementById(
              "artworkDescriptionId"
            );
            console.log(artworkDescriptionElement);
            artworkDescriptionElement.innerHTML = `Description: ${artworkDescription}`;
          }

          //If artowrk department title is available, then add it to the html
          if (departmentTitle != null) {
            const departmentTitleElement =
              document.getElementById("departmentTitleId");
            console.log(departmentTitleElement);
            departmentTitleElement.innerHTML = `Department Title: ${departmentTitle}`;
          }

          //Get the artwork image for the image id
          artworkSrcString = `https://www.artic.edu/iiif/2/${artworkImageID}/full/843,/0/default.jpg`;
          console.log(artworkSrcString);

          //Add it to the img block
          const artworkImage = document.getElementById("artworkImage");
          console.log(artworkImage);
          artworkImage.setAttribute("src", artworkSrcString);
          console.log(artworkSrcString);
          card.hidden = false;
        })
        .catch((error) => {
          console.error(`Image ${randomId} not found`, error);
        });
    })
    .catch((error) => {
      console.error(`No images were found`, error);
    });

  event.target.checked = false;
}

const card = document.getElementById("artworkSection");
card.hidden = true;

//Find the form, add listeners to the radio buttons
const wordForm = document.getElementById("wordFormId");
document.querySelectorAll('input[name="option"]').forEach((radio) => {
  radio.addEventListener("change", handleRadioChange);
});
