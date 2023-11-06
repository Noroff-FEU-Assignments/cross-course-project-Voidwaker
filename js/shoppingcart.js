let cart = JSON.parse(localStorage.getItem('Shoppingcart')) || [];

function displayCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';
    cart.forEach(function(product) {
        const productElement = document.createElement('div');
        productElement.className = 'product';

        const nameElement = document.createElement('h2');
        nameElement.textContent = product.name;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${product.price}`;

        const quantityElement = document.createElement('p');
        quantityElement.textContent = `Quantity: ${product.quantity}`;

        const totalElement = document.createElement('p');
        totalElement.textContent = `Total: $${product.price * product.quantity}`;

        productElement.appendChild(nameElement);
        productElement.appendChild(priceElement);
        productElement.appendChild(quantityElement);
        productElement.appendChild(totalElement);

        cartElement.appendChild(productElement);
    });
}


function addToCart(product) {
    const existingProduct = cart.find(function(p) {
        return p.id === product.id;
    });
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('Shoppingcart', JSON.stringify(cart));
    displayCart();
}

localStorage.setItem('Shoppingcart', JSON.stringify(cart));
console.log('cart', cart);