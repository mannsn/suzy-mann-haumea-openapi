
const randomId=Math.floor(Math.random()*100 + 2000);
console.log(randomId);
const url = `https://api.artic.edu/api/v1/artworks/${randomId}`;
console.log(url);

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json(); // Parse the response as JSON
  })
  .then((data) => {
    console.log(data);
    const artwork = data.data;
    console.log(artwork);
    const title = artwork.title;
    console.log(artwork.title);
    const artworkImageID = artwork.image_id;
    console.log(artworkImageID);

    const artworkTitle = document.getElementById("artworkTitle");
    console.log(artworkTitle);
    artworkTitle.innerHTML=title;

    artworkSrcString = `https://www.artic.edu/iiif/2/${artworkImageID}/full/3000,/0/default.jpg`
    console.log (artworkSrcString);
    const artworkImage = document.getElementById("artworkImage");
    artworkImage.setAttribute("src",artworkSrcString);
  
    console.log (artworkSrcString);

    
  
  })
  .catch((error) => {
    console.error(`Image ${randomId} not found`, error);
  });
