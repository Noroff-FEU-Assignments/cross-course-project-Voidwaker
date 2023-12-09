document.addEventListener('DOMContentLoaded', function() {
    fetchJackets();
});

function fetchJackets() {
    fetch('https://api.noroff.dev/api/v1/rainy-days/')
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
            displayFeaturedJackets(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayFeaturedJackets(jackets) {
    if(jackets.length < 4) {
        console.error('Not enough jackets to display');
        return;
    }

    // Assuming the first three jackets in the response are the ones to be featured
    updateJacketInfo(jackets[0], 'featured-jackets1');
    updateJacketInfo(jackets[1], 'featured-jackets2');
    updateJacketInfo(jackets[2], 'featured-jackets3');
    updateJacketInfo(jackets[11], 'featured-jackets4');
}

function updateJacketInfo(jacket, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // Use the image URL directly from the jacket object
        const imageUrl = jacket.image; // Assuming 'imageUrl' is the property name

        element.innerHTML = `
            <h3>${jacket.title}</h3>
            <img src="${imageUrl}" alt="${jacket.title}">
            <p>Price: $${jacket.price}</p>
            <a class="cta" href="productdescription.html?id=${jacket.id}">View Details</a>
        `;
    }
}


