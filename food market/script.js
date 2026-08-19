/* ==========================================
   PRODUCT DATA
========================================== */

const products = [
    {
        id: 1,
        name: "Jollof Rice",
        category: "meals",
        categoryName: "Local Meal",
        description: "Smoky Nigerian jollof rice with delicious sides.",
        price: 3500,
        emoji: "🍚",
        bg: "orange-bg",
        tag: "BEST SELLER"
    },

    {
        id: 2,
        name: "Fresh Tomatoes",
        category: "groceries",
        categoryName: "Groceries",
        description: "Fresh, juicy tomatoes straight from the farm.",
        price: 1800,
        emoji: "🍅",
        bg: "pink-bg",
        tag: "FRESH"
    },

    {
        id: 3,
        name: "Pounded Yam",
        category: "meals",
        categoryName: "Local Meal",
        description: "Soft and delicious pounded yam ready to enjoy.",
        price: 2800,
        emoji: "🥣",
        bg: "yellow-bg",
        tag: "POPULAR"
    },

    {
        id: 4,
        name: "Palm Oil",
        category: "groceries",
        categoryName: "Groceries",
        description: "Premium Nigerian palm oil for your kitchen.",
        price: 4200,
        emoji: "🫙",
        bg: "orange-bg",
        tag: "PREMIUM"
    },

    {
        id: 5,
        name: "Chicken & Chips",
        category: "meals",
        categoryName: "Local Meal",
        description: "Crispy chicken served with golden fries.",
        price: 5500,
        emoji: "🍗",
        bg: "yellow-bg",
        tag: "HOT"
    },

    {
        id: 6,
        name: "Zobo Drink",
        category: "drinks",
        categoryName: "Drinks",
        description: "Refreshing homemade hibiscus drink.",
        price: 1500,
        emoji: "🧃",
        bg: "pink-bg",
        tag: "FRESH"
    },

    {
        id: 7,
        name: "Plantain Chips",
        category: "snacks",
        categoryName: "Snacks",
        description: "Crunchy golden plantain chips.",
        price: 1200,
        emoji: "🍌",
        bg: "yellow-bg",
        tag: "POPULAR"
    },

    {
        id: 8,
        name: "Fresh Vegetables",
        category: "groceries",
        categoryName: "Groceries",
        description: "A healthy selection of fresh vegetables.",
        price: 2500,
        emoji: "🥬",
        bg: "green-bg",
        tag: "FRESH"
    },

    {
        id: 9,
        name: "Egusi Soup",
        category: "meals",
        categoryName: "Local Meal",
        description: "Rich and delicious Nigerian egusi soup.",
        price: 4500,
        emoji: "🍲",
        bg: "orange-bg",
        tag: "POPULAR"
    },

    {
        id: 10,
        name: "Orange Juice",
        category: "drinks",
        categoryName: "Drinks",
        description: "Cold and refreshing freshly squeezed juice.",
        price: 2200,
        emoji: "🍊",
        bg: "yellow-bg",
        tag: "FRESH"
    },

    {
        id: 11,
        name: "Meat Pie",
        category: "snacks",
        categoryName: "Snacks",
        description: "Freshly baked Nigerian meat pie.",
        price: 1800,
        emoji: "🥧",
        bg: "orange-bg",
        tag: "HOT"
    },

    {
        id: 12,
        name: "Rice & Stew",
        category: "meals",
        categoryName: "Local Meal",
        description: "White rice served with rich Nigerian stew.",
        price: 4000,
        emoji: "🍛",
        bg: "red-bg",
        tag: "POPULAR"
    }
];


/* ==========================================
   CART
========================================== */

let cart = [];

let currentCategory = "all";


/* ==========================================
   FORMAT MONEY
========================================== */

function formatMoney(amount) {
    return "₦" + amount.toLocaleString("en-NG");
}


/* ==========================================
   DISPLAY PRODUCTS
========================================== */

function displayProducts(list = products) {

    const productGrid = document.getElementById("productGrid");
    const emptyState = document.getElementById("emptyState");

    productGrid.innerHTML = "";

    if (list.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    list.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image ${product.bg}">

                <span>${product.emoji}</span>

                <div class="product-tag">
                    ${product.tag}
                </div>

                <button
                    class="favorite"
                    onclick="favoriteProduct(this)"
                    aria-label="Add to favourites"
                >
                    <i class="fa-regular fa-heart"></i>
                </button>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.categoryName}
                </span>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <div class="price">
                        ${formatMoney(product.price)}
                        <small>/ item</small>
                    </div>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                        aria-label="Add to cart"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);
    });
}


/* ==========================================
   FILTER PRODUCTS
========================================== */

function filterProducts(category, button) {

    currentCategory = category;

    document
        .querySelectorAll(".category-card")
        .forEach(card => card.classList.remove("active"));

    button.classList.add("active");

    const searchTerm =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    let filtered = products;

    if (category !== "all") {
        filtered = filtered.filter(
            product => product.category === category
        );
    }

    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    displayProducts(filtered);

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ==========================================
   SEARCH
========================================== */

function searchProducts() {

    const searchTerm =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    let filtered = products;

    if (currentCategory !== "all") {
        filtered = filtered.filter(
            product => product.category === currentCategory
        );
    }

    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.categoryName.toLowerCase().includes(searchTerm)
        );
    }

    displayProducts(filtered);
}


/* ==========================================
   ADD TO CART
========================================== */

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    showToast(`${product.name} added to your cart!`);
}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-image">
                ${item.emoji}
            </div>

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ${formatMoney(item.price)}
                </p>

                <div class="quantity">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = totalItems;

    cartTotal.textContent = formatMoney(totalPrice);

    if (cart.length === 0) {

        cartEmpty.style.display = "grid";
        cartItems.style.display = "none";

    } else {

        cartEmpty.style.display = "none";
        cartItems.style.display = "block";

    }
}


/* ==========================================
   CHANGE QUANTITY
========================================== */

function changeQuantity(productId, change) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCart();
}


/* ==========================================
   REMOVE PRODUCT
========================================== */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    updateCart();

    showToast("Item removed from cart");
}


/* ==========================================
   OPEN CART
========================================== */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


/* ==========================================
   CLOSE CART
========================================== */

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");

    document.body.style.overflow = "";
}


/* ==========================================
   CHECKOUT
========================================== */

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    document.getElementById("checkoutTotal").textContent =
        formatMoney(total);

    document
        .getElementById("checkoutModal")
        .classList.add("active");
}


/* ==========================================
   CLOSE CHECKOUT
========================================== */

function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");
}


/* ==========================================
   PLACE ORDER
========================================== */

function placeOrder() {

    closeCheckout();
    closeCart();

    cart = [];

    updateCart();

    showToast("🎉 Order placed successfully!");

}


/* ==========================================
   FAVORITE
========================================== */

function favoriteProduct(button) {

    const icon = button.querySelector("i");

    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");

    if (icon.classList.contains("fa-solid")) {

        button.style.color = "#e85a5a";

        showToast("Added to favourites ❤️");

    } else {

        button.style.color = "";

        showToast("Removed from favourites");

    }
}


/* ==========================================
   SEARCH BUTTON
========================================== */

function focusSearch() {

    document
        .getElementById("searchInput")
        .focus();

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ==========================================
   MOBILE MENU
========================================== */

function toggleMenu() {

    const navLinks =
        document.querySelector(".nav-links");

    const isOpen =
        navLinks.style.display === "flex";

    if (isOpen) {

        navLinks.style.display = "";

    } else {

        navLinks.style.display = "flex";

        navLinks.style.position = "absolute";
        navLinks.style.top = "78px";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.padding = "25px";
        navLinks.style.background = "#fffaf1";
        navLinks.style.flexDirection = "column";
        navLinks.style.gap = "20px";
        navLinks.style.boxShadow =
            "0 15px 30px rgba(0,0,0,.08)";
    }
}


/* ==========================================
   PROMO
========================================== */

function showPromo() {

    showToast("🎁 Your discount code is NAIJABITE15");

}


/* ==========================================
   TOAST
========================================== */

let toastTimeout;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("active");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("active");

    }, 3000);
}


/* ==========================================
   INITIALIZE
========================================== */

displayProducts();

updateCart();