const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

async function fetchProducts() {
    const loadingIndicator = document.getElementById('loading-indicator');
    try {
        loadingIndicator.style.display = 'block';  // Show loading indicator
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        displayError(error);
    } finally {
        loadingIndicator.style.display = 'none';  // Hide loading indicator
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";
    products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.className = "product-container";

    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    imageElement.alt = product.name;

    const nameElement = document.createElement("h2");
    nameElement.textContent = product.name;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = product.description;

    const buttonElement = document.createElement("a");
    buttonElement.href = `productdescription.html?id=${product.id}`;
    buttonElement.textContent = "View Details";
    buttonElement.className = "view-details-button";

    productElement.appendChild(imageElement);
    productElement.appendChild(nameElement);
    productElement.appendChild(descriptionElement);
    productElement.appendChild(buttonElement);

    productContainer.appendChild(productElement);
    });
}

function displayError(error) {
    const errorElement = document.getElementById("error");
    if (errorElement) {
        errorElement.textContent = "Failed to fetch products: " + error.message;
    } else {
        console.error("Failed to fetch products: " + error.message);
    }
}

async function main() {
    try {
        await fetchProducts();
    } finally {
    }
}

main();