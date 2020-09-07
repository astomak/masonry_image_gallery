const image_grid = document.querySelector("#image-grid");
const double_loader = document.querySelector("#double_ring_loader");
const infinity_loader = document.querySelector("#infinity-loader");
const API_KEY = 'qIV_rSZU8bI2jrRGKgSG67paYq_AVQUaDp2fMXFA4uw';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=`;

// Some flag Variables
let imageLoadedCount = 0;
let ready = false;
let totalImages = 0;

// Function will run after each image is loaded
function imgLoded() {
    imageLoadedCount++;
    console.log(imageLoadedCount);
    if (imageLoadedCount === totalImages) {
        ready = true;
        double_loader.classList.add("hidden");
        infinity_loader.classList.add("hidden");
    }
}

// Function to add photo from API to the image-grid
function displayPhotos(data) {
    totalImages = data.length;
    data.forEach(photo => {
        // Creating a tag for images
        image_container = document.createElement('a');
        image_container.href = photo.links.html;
        image_container.target = "_blank";
        // Creating img element with src and title
        img = document.createElement('img');
        img.src =  photo.urls.regular;
        img.title =  photo.alt_description;
        // Dynamically changing row span of grid item based on its resolution
        if (photo.height > photo.width + 800) {
            image_container.classList += "grid-item row-span-2";
        } else {
            image_container.classList += "grid-item";
        }
   
        img.addEventListener("load", imgLoded);
        image_container.appendChild(img);
        image_grid.appendChild(image_container);
    });
}

// Getting Photos from Unsplash API
const getPhotosFromAPI = async (count=20) => {
    try {
        imageLoadedCount = 0;
        const response = await fetch(apiURL + count);
        const data = await response.json();
        // Adding each photo to image-grid
        displayPhotos(data);

    } catch(err) {
        console.log("Oops! Something went wrong!", err);
    }
}


// Infinite Scrolling
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        infinity_loader.classList.remove("hidden");
        getPhotosFromAPI(30);
    }
});

getPhotosFromAPI();