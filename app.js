const catImage = document.getElementById("catImage");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

let currentCatIndex = 0;
let catData = [];

async function fetchCatData() {
    try {
        const response = await fetch("https://cataas.com/api/cats?tags=cute");
        const data = await response.json();
        catData = data;
        displayCatImage();
    } catch (error) {
        console.error("Error fetching cat data:", error);
    }
}

function displayCatImage() {
    if (catData.length > 0) {
        const cat = catData[currentCatIndex];
        const catImageUrl = `https://cataas.com/cat/${cat._id}`;
        catImage.src = catImageUrl;
        catImage.alt = "A cute cat";
    } else {
        console.log("No cat data available.");
    }
}

nextButton.addEventListener("click", () => {
    if (catData.length > 0) {
        currentCatIndex = (currentCatIndex + 1) % catData.length; // Loop back to the first cat if reached the end
        displayCatImage();
    }
});

prevButton.addEventListener("click", () => {
    if (catData.length > 0) {
        currentCatIndex = (currentCatIndex - 1 + catData.length) % catData.length; // Loop back to the last cat if at the beginning
        displayCatImage();
    }
});

fetchCatData();
