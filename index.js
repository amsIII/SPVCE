// import "babel-polyfill";
// import "@fortawesome/fontawesome-free/css/all.css";

// UNSPLASH API
const apiKey = "ikQcbJr_7IygKALH3xB-eh-FFjXyK-2aiEq62d2DCtY";
const orientation = "squarish";
const query = "space";
let count = 5;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&orientation=${orientation}&count=${count}&query=${query}`;

const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let photosArr = [];
let ready = false;
let loadedImgs = 0;
let totalImgs = 0;
let initialLoad = true;

// check if all images were loaded
function imageLoaded() {
  loadedImgs++;
  // console.log(loadedImgs);
  if (loadedImgs === totalImgs) {
    ready = true;
    loader.hidden = true;
    // initialLoad = false;
    count = 30;
    // console.log("ready =", ready);
  } else {
  }
}

// Helpr function to setAttributes on DOM Els
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos & add to DOM
function displayPhotos() {
  loadedImgs = 0;
  totalImgs = photosArr.length;
  // console.log("Total Images: ", totalImgs);
  // Run function for object in photosArr
  photosArr.forEach((photo) => {
    // Creat <a>
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Creat <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // eventListener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// Get Photos From Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    // console.log(photosArr);
    displayPhotos();
  } catch (error) {
    console.log("error");
  }
}

// Scroll event
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log("load more");
  }
});

// ON LOAD
getPhotos();
