let cart = JSON.parse(localStorage.getItem('Shoppingcart')) || [];

function createProductElement(product) {
    console.log("Creating element for product:", product);

    const productElement = document.createElement('div');
    productElement.className = 'product';

    // If the product has an image property, create and append an img element.
    if (product.image) {
        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = product.name || 'Product image';
        imgElement.style.width = '100px'; // Set the image width or any style as needed
        productElement.appendChild(imgElement);
    }

    const nameElement = document.createElement('h2');
    nameElement.textContent = product.name || "No name available"; // Fallback text in case name is not provided

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${product.price}`;

    const quantityElement = document.createElement('p');
    quantityElement.textContent = `Quantity: ${product.quantity}`;

    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: $${(product.price * product.quantity).toFixed(2)}`;

    // Check if any details are missing
    if (!product.name) console.error("Product name is missing");
    if (!product.price) console.error("Product price is missing");
    if (typeof product.quantity === 'undefined') console.error("Product quantity is missing");

    // Remove products from the cart
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove one';
    removeButton.onclick = function() {
        removeFromCart(product.id);
    };

    // Append elements to the productElement in the order you want them to display
    productElement.appendChild(nameElement);
    productElement.appendChild(priceElement);
    productElement.appendChild(quantityElement);
    productElement.appendChild(totalElement);
    productElement.appendChild(removeButton);

    return productElement;
}


function removeFromCart(productId) {
    const productIndex = cart.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        // Decrease the quantity of the product
        cart[productIndex].quantity -= 1;

        // If the quantity is 0, remove the product from the cart
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }

        // Update the cart in local storage and re-display the cart
        localStorage.setItem('Shoppingcart', JSON.stringify(cart));
        displayCart();
    } else {
        console.error('Product not found in cart: ', productId);
    }
}



function displayCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';
    const fragment = document.createDocumentFragment();
    cart.forEach(product => {
        fragment.appendChild(createProductElement(product));
    });
    cartElement.appendChild(fragment);
}

function addToCart(productToAdd) {
    const existingProductIndex = cart.findIndex(p => p.id === productToAdd.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        // Ensure that the productToAdd includes the 'name' property
        cart.push({ ...productToAdd, quantity: 1 });
    }
    console.log("Updated cart:", cart);
    localStorage.setItem('Shoppingcart', JSON.stringify(cart));
    displayCart();
}


document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});  
