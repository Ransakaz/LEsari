document.addEventListener('DOMContentLoaded', function(){
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');

    // Parse URL parameters to get cart items
    const params = new URLSearchParams(window.location.search);
    const cartItems = JSON.parse(params.get('cartItems')) || [];
    let total = 0;

    // Display cart items in the order summary
    cartItems.forEach(item => {
        const orderItemDiv = document.createElement('div');
        orderItemDiv.classList.add('order-item');
        orderItemDiv.innerHTML = `
            <p>${item.name} - $${item.price}</p>
        `;
        orderItemsContainer.appendChild(orderItemDiv);
        total += parseFloat(item.price);
    });

    orderTotal.textContent = `$${total.toFixed(2)}`;

    // Confirm Order button event listener
    const confirmOrderBtn = document.getElementById('confirm-order');
    confirmOrderBtn.addEventListener('click', function() {
        // Here you can implement the logic to finalize the order
        alert('Your order has been confirmed! Thank you for shopping with us.');
        window.location.href = "homepage.html"; // Redirect to homepage after confirming order
    });
});
