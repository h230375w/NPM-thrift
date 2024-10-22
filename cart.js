let cart = [];

// Function to add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new item
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
    renderCart(); // Call to render cart and update totals

    // Update the slider total price after rendering the cart
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('slider-total-price').innerText = `$${totalPrice.toFixed(2)}`;
}


// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function renderCart(){
    const cartElement = document.getElementById('cart-items');

    const cartItems = JSON.parse(localStorage.getItem("cart")) ?? [];
if (!cartElement) return

    cartElement.innerHTML = '';
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartElement.innerHTML += `
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
    
}

// Function to update the cart display
function updateCart() {
    // const cartItemsContainer = document.getElementById('cart-items');
    // cartItemsContainer.innerHTML = ''; // Clear existing items
    // let totalPrice = 0;

    // cart.forEach(item => {
    //     const itemTotal = item.price * item.quantity;
    //     totalPrice += itemTotal;
    //     cartItemsContainer.innerHTML += `
    //         <tr>
    //             <td>${item.name}</td>
    //             <td>$${item.price.toFixed(2)}</td>
    //             <td>
    //                 <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
    //             </td>
    //             <td>$${itemTotal.toFixed(2)}</td>
    //             <td>
    //                 <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
    //             </td>
    //         </tr>
    //     `;
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to Local Storage

    // });

    // document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to update quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        updateCart();
    }
}

// Simulated product data
// const products = [
//     { id: 1, name: 'Ripped Baggy Jean', price: 19.99 },
//     { id: 2, name: 'Cargo Zera Jeans', price: 29.99 },
//     // Add more products as needed
// ];
window.onload = function() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        updateCart();
    }
};
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Proceeding to checkout...');
        // Redirect to checkout page or implement checkout logic
    } else {
        alert('Your cart is empty!');
    }
});

// // Example of adding products to the cart
// addToCart(products[0]);
// addToCart(products[1]);
