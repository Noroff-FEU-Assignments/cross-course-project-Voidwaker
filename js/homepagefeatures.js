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
    if (jackets.length < 4) {
        console.error('Not enough jackets to display');
        return;
    }

    // Assuming the first three jackets in the response are the ones to be featured
    updateJacketInfo(jackets[4], 'featured-jackets1');
    updateJacketInfo(jackets[1], 'featured-jackets2');
    updateJacketInfo(jackets[2], 'featured-jackets3');
    
    // Check if the jacket ID is 6 (or any other ID you want to exclude)
    if (jackets[6].id !== 6) {
        updateJacketInfo(jackets[6], 'featured-jackets4');
    }
}
function updateJacketInfo(jacket, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const imageUrl = jacket.images && jacket.images.length > 0 ? jacket.images[0].src : ''; // Get the first image URL

        console.log('API Response for Jacket:', jacket); // Debugging line

        let htmlContent = `
            <h3>${jacket.name}</h3>
            <img src="${imageUrl}" alt="${jacket.name}">
        `;

        // Conditionally add the "View Details" button
        if (jacket.permalink) {
            htmlContent += `<a class="cta" href="productdescription.html?id=${jacket.id}">View Details</a>`;
        }

        // Legg til prisen her
        const priceElement = document.createElement("p");
        if (jacket.prices && jacket.prices.price) {
            const priceInNOK = jacket.prices.price / 100; // Prisen in nok
            const formattedPrice = priceInNOK.toLocaleString("nb-NO", { style: "currency", currency: "NOK" });
            priceElement.textContent = `Price: ${formattedPrice}`;
        } else {
            priceElement.textContent = "Price: Not available";
        }

        element.innerHTML = htmlContent;
        element.appendChild(priceElement); 
    }
}

    




