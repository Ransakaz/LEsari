document.addEventListener('DOMContentLoaded', function () {
    const products = [
        {
            name: 'Bloom And Brew',
            description: 'descrip',
            price: 5.00,
            images: [
                'https://www.pixelsquid.com/png/shampoo-bottle-2020336540588185195?image=G03'
            ]
        },

        
    ];

    const productContainer = document.getElementById('products');
    const selectedImageBox = document.getElementById('selected-image-box');
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');
    const thankYouMessage = document.getElementById('thank-message'); // New element
    const cart = [];

    function updateCartDisplay() {
        cartContainer.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - $${item.price}</p>
            `;
            cartContainer.appendChild(cartItemDiv);
            totalPrice += parseFloat(item.price);
        });
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    function updateOrderSummary() {
        orderSummary.innerHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            const orderItemDiv = document.createElement('div');
            orderItemDiv.classList.add('order-item');
            orderItemDiv.innerHTML = `
                <p>${item.name} - $${item.price}</p>
            `;
            orderSummary.appendChild(orderItemDiv);
            totalPrice += parseFloat(item.price);
        });
        orderTotal.textContent = `$${totalPrice.toFixed(2)}`; // Update order total
    }

    function addToCart(index) {
        const productName = products[index].name;
        const mainImageSrc = products[index].images[0];
        const productPrice = products[index].price;
        cart.push({
            name: productName,
            image: mainImageSrc,
            price: productPrice.toFixed(2)
        });
        updateCartDisplay();
        updateOrderSummary();
    }

    function createProductElement(product, index) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="card">
                <figure>
                    <img src="${product.images[0]}" alt="${product.name}" id="main-image-${index}">
                </figure>
                <section class="details">
                    <div class="min-details">
                        <h1>${product.name}</h1>
                        <h1 class="price">$${product.price.toFixed(2)}</h1>
                    </div>
                    <div class="options-images">
                        ${product.images.map((image, imgIndex) => `<img src="${image}" alt="${product.name}" onclick="selectImage(this, ${index}, ${imgIndex})">`).join('')}
                    </div>
                    <button class="btn addToCartBtn">Add to Cart</button>
                </section>
            </div>
        `;
        productDiv.querySelector('.addToCartBtn').addEventListener('click', function () {
            addToCart(index);
        });
        return productDiv;
    }

    function createProducts() {
        products.forEach((product, index) => {
            const productItem = createProductElement(product, index);
            productContainer.appendChild(productItem);
        });
    }

    createProducts();

    clearCartBtn.addEventListener('click', function () {
        cart.length = 0;
        updateCartDisplay();
        updateOrderSummary();
    });

    checkoutBtn.addEventListener('click', function () {
        document.getElementById('checkout-modal').style.display = 'block';
    });

    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('checkout-modal').style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        const modal = document.getElementById('checkout-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('payment-form').addEventListener('submit', function (event) {
        event.preventDefault();
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('billing-address-form').style.display = 'block';
    });

    document.getElementById('billing-address-form').addEventListener('submit', function (event) {
        event.preventDefault();
        document.getElementById('billing-address-form').style.display = 'none';
        document.getElementById('contact-details-form').style.display = 'block';
    });

    document.getElementById('contact-details-form').addEventListener('submit', function (event) {
        event.preventDefault();
        document.getElementById('contact-details-form').style.display = 'none';
        document.getElementById('order-summary').style.display = 'none'; 
        document.getElementById('thank-message').style.display = 'block'; 
        updateOrderSummary(); 
    });

});
