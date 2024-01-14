const apiUrl = "https://bollingvaaler.no/wp-json/wc/store/products/";

async function fetchProduct(id) {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
    try {
        const response = await fetch(`${apiUrl}${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
        console.log('Product fetched:', product); // Debugging line

        // converts the price from cents to NOK
        const priceInOre = parseFloat(product.prices.price) / 100;
        
        // formats the price to NOK
        const formattedPrice = priceInOre.toLocaleString("nb-NO", { style: "currency", currency: "NOK" });

        console.log('Price in NOK:', formattedPrice); // Debugging line

        product.prices.price = formattedPrice; // opdates the price in the product object

        displayProduct(product);
    } catch (error) {
        console.error('Fetching product failed:', error); // Debugging line
        displayError(error);
    } finally {
        loadingIndicator.style.display = 'none'; 
    }
}

function displayProduct(product) {
    const productContainer = document.getElementById("product-container");

    const nameElement = document.createElement("h2");
    nameElement.textContent = product.name;

    const imageElement = document.createElement("img");
    if (product.images && product.images.length > 0) {
        imageElement.src = product.images[0].src;
        imageElement.alt = product.name;
    }

    const descriptionElement = document.createElement("p");
    if (product.short_description) {
        descriptionElement.innerHTML = product.short_description;
    }

    const priceElement = document.createElement("p");
    if (product.prices && product.prices.price) {
        const priceInNOK = product.prices.price; // price in NOK
        const formattedPrice = priceInNOK.toLocaleString("nb-NO", { style: "currency", currency: "NOK" });
        priceElement.textContent = `Price: ${formattedPrice}`;
    } else {
        priceElement.textContent = "Price: Not available";
    }
    
    // add to cart button
    const cartButton = document.createElement("button");
    cartButton.className = "add-to-cart-button";
    cartButton.textContent = "Add to cart";
    cartButton.addEventListener('click', function() {
        addToCart(product);
        alert('Product added to cart');
        window.location.href = '/cart.html';
    });
    
    productContainer.appendChild(imageElement);
    productContainer.appendChild(nameElement);
    productContainer.appendChild(descriptionElement);
    productContainer.appendChild(priceElement);
    productContainer.appendChild(cartButton);
}

function displayError(error) {
    const errorElement = document.getElementById("error");
    if (errorElement) {
        errorElement.textContent = "Failed to fetch product: " + error.message;
    } else {
        console.error("Failed to fetch product: " + error.message);
    }
}

function getProductIdFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id");
}

async function main() {
    const productId = getProductIdFromUrl();
    console.log(`Product ID: ${productId}`);
    if (productId) {
        await fetchProduct(productId);
    } else {
        console.error("No product ID found in the URL");
    }
}

main();
