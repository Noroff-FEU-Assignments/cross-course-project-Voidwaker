let cart = JSON.parse(localStorage.getItem('Shoppingcart')) || [];

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product';

    if (product.image) {
        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = product.name || 'Product image';
        imgElement.style.width = '100px';
        productElement.appendChild(imgElement);
    }

    const nameElement = document.createElement('h2');
    nameElement.textContent = product.title || "No name available";
    productElement.appendChild(nameElement);

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${product.price}`;
    productElement.appendChild(priceElement);

    const quantityElement = document.createElement('p');
    quantityElement.textContent = `Quantity: ${product.quantity}`;
    productElement.appendChild(quantityElement);

    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: $${(product.price * product.quantity).toFixed(2)}`;
    productElement.appendChild(totalElement);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove one';
    removeButton.onclick = function() {
        removeFromCart(product.id);
    };
    productElement.appendChild(removeButton);

    return productElement;
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
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

    if (cart.length > 0) {
        // Calculate and display total
        const total = calculateTotal();
        const totalElement = document.createElement('p');
        totalElement.textContent = `Running Total: $${total.toFixed(2)}`;
        fragment.appendChild(totalElement);

        // Checkout button
        const checkoutButton = createCheckoutButton();
        fragment.appendChild(checkoutButton);
    }

    cartElement.appendChild(fragment);
}


function createCheckoutButton() {
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Proceed to Checkout';
    checkoutButton.onclick = function() {
        window.location.href = '/confirmation-cart.html'; // Replace with your checkout page URL
    };
    return checkoutButton;
}

function addToCart(productToAdd) {
    const existingProductIndex = cart.findIndex(p => p.id === productToAdd.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }
    localStorage.setItem('Shoppingcart', JSON.stringify(cart));
    displayCart();
}

function calculateTotal() {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
}

document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});

