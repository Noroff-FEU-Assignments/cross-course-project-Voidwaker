const apiUrl = "https://api.noroff.dev/api/v1/rainy-days/";

async function fetchProduct(id) {
    try {
        const response = await fetch(`${apiUrl}${id}`);
        console.log(`API Response:`, response); // Log the API response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
        console.log(`Product Details:`, product); // Log the product details
        displayProduct(product);
    } catch (error) {
        displayError(error);
    }
}

function displayProduct(product) {
    const productContainer = document.getElementById("product-container");

    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    imageElement.alt = product.name;

    const nameElement = document.createElement("h2");
    nameElement.textContent = product.name;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = product.description;

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: $${product.price}`;

    productContainer.appendChild(imageElement);
    productContainer.appendChild(nameElement);
    productContainer.appendChild(descriptionElement);
    productContainer.appendChild(priceElement);
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
    console.log(`Product ID: ${productId}`); // Log the product ID
    if (productId) {
        await fetchProduct(productId);
    } else {
        console.error("No product ID found in the URL");
    }
}

main();