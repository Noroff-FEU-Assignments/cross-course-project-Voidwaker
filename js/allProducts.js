const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";
let allProducts = [];

// Function to fetch all products from the API
async function fetchAllProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProducts = await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        displayError(error);
    }
}

// Function to filter products by gender
function filterProductsByGender(products, gender) {
    return products.filter(product => product.gender === gender);
}

// Setup gender filters
function setupGenderFilters() {
    document.getElementById('mens-jackets').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const mensJackets = filterProductsByGender(allProducts, 'men');
        displayProducts(mensJackets);
    });

    document.getElementById('womens-jackets').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const womensJackets = filterProductsByGender(allProducts, 'women');
        displayProducts(womensJackets);
    });
}


// Function to fetch a single product based on ID
async function fetchProduct(id) {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
        displayProduct(product);
    } catch (error) {
        console.error('Fetching product failed:', error);
        displayError(error);
    } finally {
        loadingIndicator.style.display = 'none'; 
    }
}

// Function to display a single product
function displayProduct(product) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";

    // ... create and append elements for the single product
}

// Function to display multiple products
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "procuct";

        const nameElement = document.createElement("h2");
        nameElement.textContent = product.title;

        const imageElement = document.createElement("img");
        imageElement.src = product.image;
        imageElement.alt = product.title;

        const priceElement = document.createElement("p");
        priceElement.textContent = `Price: $${product.price}`;

        //dropdown to change size //
        const sizeSelect = document.createElement("select");
        product.sizes.forEach(size => { 
            const sizeOption = document.createElement("option");
            sizeOption.value = size;
            sizeOption.textContent = size;
            sizeSelect.appendChild(sizeOption);
        });

        // paragraphe for quantity
        const quantityElement = document.createElement("p");
        quantityElement.textContent = `Quantity left: ${product.quantity}`;

        // view details button
        let detailsButton = document.createElement("a");
        detailsButton.href = `productdescription.html?id=${product.id}`;
        detailsButton.textContent = "View Details";
        detailsButton.className = "view-details-button";

        productElement.appendChild(imageElement);
        productElement.appendChild(nameElement);
        productElement.appendChild(priceElement);
        productElement.appendChild(sizeSelect); //size dropdown
        productElement.appendChild(detailsButton); // view details button
        productElement.appendChild(quantityElement); // quantity dropdown
        productContainer.appendChild(productElement);
    });
}


// Function to display error messages
function displayError(error) {
    const errorElement = document.getElementById("error");
    if (errorElement) {
        errorElement.textContent = "Failed to fetch products: " + error.message;
    } else {
        console.error("Failed to fetch products: " + error.message);
    }
}

// Function to extract product ID from URL
function getProductIdFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id");
}

// Main function to control the flow of the script
async function main() {
    const productId = getProductIdFromUrl();
    if (productId) {
        await fetchProduct(productId);
    } else {
        await fetchAllProducts();
        displayProducts(allProducts); // Display all products initially
        setupGenderFilters();
    }
}

main();
