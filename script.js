// Get references to the required HTML elements
const searchForm = document.getElementById('searchForm'); // The form element where the user enters search queries
const searchBox = document.getElementById('searchBox'); // The input field for the search query
const searchResult = document.getElementById('searchResult'); // The div where search results will be displayed
const showMoreBtn = document.getElementById('showMoreBtn'); // Button to load more images

// For Explanation: https://www.notion.so/shivansh3103/Image-Search-Engine-19765d0d3f2d8080b7edd532b40d45dd?pvs=4

// Unsplash API access key (replace this with your own key if necessary)
const accessKey = "WpctxtYZ78Vp4TkOocsMVpj_H-Ugn8bnsWTP-KEYNe8";

let keyword = ""; // Stores the current search keyword
let page = 1; // Keeps track of the page number for pagination

// Function to fetch images from Unsplash API
async function searchImage() {
    keyword = searchBox.value; // Get the search term entered by the user
    const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${keyword}&client_id=${accessKey}`;
    
    const response = await fetch(url); // Fetch data from the API
    const data = await response.json(); // Convert the response to JSON format

    const results = data.results; // Extract the list of image results

    // If it's the first page, clear previous search results
    if (page == 1) {
        searchResult.innerHTML = "";
    }

    // Loop through the image results and display them
    results.map((result) => {
        const image = document.createElement("img"); // Create an <img> element
        image.src = result.urls.small; // Set the image source to the small version of the image

        const imageLink = document.createElement("a"); // Create an anchor (<a>) element
        imageLink.href = result.links.html; // Set the link to the original image page on Unsplash
        imageLink.target = "_blank"; // Open the link in a new tab

        imageLink.appendChild(image); // Append the image inside the anchor tag
        searchResult.appendChild(imageLink); // Append the anchor tag to the search results container
    });

    showMoreBtn.style.display = 'block'; // Show the "Show More" button after fetching results
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    page = 1; // Reset to the first page for a new search
    searchImage(); // Call the function to fetch images
});

// Event listener for "Show More" button
showMoreBtn.addEventListener("click", () => {
    page++; // Increment the page number to load more images
    searchImage(); // Fetch the next set of images
});