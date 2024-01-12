document.addEventListener('DOMContentLoaded', function() {
    fetchJackets();
});

function fetchJackets() {
    fetch('https://bollingvaaler.no/wp-json/wc/store/products')
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
    updateJacketInfo(jackets[4], 'featured-jackets1');
    updateJacketInfo(jackets[1], 'featured-jackets2');
    updateJacketInfo(jackets[2], 'featured-jackets3');
    updateJacketInfo(jackets[6], 'featured-jackets4');
}

function updateJacketInfo(jacket, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const imageUrl = jacket.images && jacket.images.length > 0 ? jacket.images[0].src : ''; // Sjekker om 'images' eksisterer og har minst ett bilde

        let htmlContent = `
            <h3>${jacket.name}</h3>
            <img src="${imageUrl}" alt="${jacket.name}">
            <p>Price: ${jacket.prices.price_html}</p>
        `;

        // Conditionally add the "View Details" button
        if (jacket.permalink) {
            htmlContent += `<a class="cta" href="${jacket.permalink}">View Details</a>`;
        }

        element.innerHTML = htmlContent;
    }
}



