let cart = [];

// Function to add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new item
    }
    updateCart();
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to update the cart display and calculate total
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        cartItemsContainer.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                </td>
            </tr>
        `;
    });

    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to update quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        updateCart();
    }
}

// Simulated product data (to be replaced with actual data)
const products = [
    { id: 1, name: 'Ripped Baggy Jean', price: 19.99 },
    { id: 2, name: 'Cargo Zera Jeans', price: 29.99 },
//     // Add more products as needed
];

// Example of adding products to the cart (for testing)
// addToCart(products[0]);
// addToCart(products[1]);
