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
        const imageUrl = jacket.image; // Assuming 'imageUrl' is the property name

        let htmlContent = `
            <h3>${jacket.title}</h3>
            <img src="${imageUrl}" alt="${jacket.title}">
            <p>Price: $${jacket.price}</p>
        `;

        // Conditionally add the "View Details" button
        if (jacket.id !== "b8b528fc-6c60-41f6-a5a9-9a8b27a9482a") { // Replace with the actual ID
            htmlContent += `<a class="cta" href="productdescription.html?id=${jacket.id}">View Details</a>`;
        }

        element.innerHTML = htmlContent;
    }
}



