

const apiUrl = "https://bollingvaaler.no/wp-json/wc/store/products";
let allProducts = [];

// Function to fetch all products from the API
async function fetchAllProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProducts = await response.json();
        displayProducts(allProducts); // Display all products initially
        setupGenderFilters();
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
        const mensJackets = filterProductsByGender(allProducts, 'mens');
        displayProducts(mensJackets);
    });

    document.getElementById('womens-jackets').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const womensJackets = filterProductsByGender(allProducts, 'womens');
        displayProducts(womensJackets);
    });
}

// Function to display multiple products
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";

    if (products && products.length > 0) {
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.className = "product";

            const nameElement = document.createElement("h2");
            nameElement.textContent = product.name;

            const imageElement = document.createElement("img");
            if (product.images && product.images.length > 0) {
                imageElement.src = product.images[0].src;
                imageElement.alt = product.name;
            }

            const priceElement = document.createElement("p");
            if (product.prices && product.prices.price_html) {
                priceElement.innerHTML = product.prices.price_html;
            }

            
            const sizeElement = document.createElement("p");
            if (product.sizes && product.sizes.length > 0) {
                sizeElement.textContent = `Available Sizes: ${product.sizes.join(", ")}`;
            }

            const descriptionElement = document.createElement("p");
            if (product.description && product.description.rendered) {
                descriptionElement.innerHTML = product.description.rendered;
            }

           
            const detailsButton = document.createElement("a");
            detailsButton.href = `productdescription.html?id=${product.id}`; 
            detailsButton.className = "view-details-button";

            
            productElement.appendChild(nameElement);
            productElement.appendChild(imageElement);
            productElement.appendChild(priceElement);
            productElement.appendChild(sizeElement);
            productElement.appendChild(descriptionElement);
            productElement.appendChild(detailsButton);

            productContainer.appendChild(productElement);
        });
    } else {
        
        productContainer.innerHTML = "No products found.";
    }
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

// Main function to control the flow of the script
async function main() {
    await fetchAllProducts();
    displayProducts(allProducts); // Display all products initially
    setupGenderFilters();
}

main();


