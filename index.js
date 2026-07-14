const PRODUCTS = [
    {
        id: "oxford-ease-shirt",
        name: "Oxford Ease Shirt",
        category: "Men",
        type: "Shirts",
        price: 1899,
        image: "srt1.webp",
        badge: "New",
        sizes: ["S", "M", "L", "XL"],
        rating: 4.8,
        featured: true,
        description: "A relaxed cotton oxford with a clean collar, dropped shoulder and an easy shape that works tucked or loose."
    },
    {
        id: "coastal-stripe-shirt",
        name: "Coastal Stripe Shirt",
        category: "Men",
        type: "Shirts",
        price: 2099,
        image: "srt2.webp",
        badge: "Bestseller",
        sizes: ["S", "M", "L", "XL"],
        rating: 4.9,
        featured: true,
        best: true,
        description: "Soft vertical stripes, a breezy regular fit and a refined finish make this an effortless everyday layer."
    },
    {
        id: "sand-knit-overshirt",
        name: "Sand Knit Overshirt",
        category: "Men",
        type: "Layers",
        price: 2499,
        image: "srt6.webp",
        badge: "Limited",
        sizes: ["M", "L", "XL"],
        rating: 4.7,
        featured: true,
        description: "A textured mid-weight overshirt designed for easy layering, finished with tonal buttons and roomy pockets."
    },
    {
        id: "sculpted-rib-top",
        name: "Sculpted Rib Top",
        category: "Women",
        type: "Tops",
        price: 1599,
        image: "wn4.webp",
        badge: "New",
        sizes: ["XS", "S", "M", "L"],
        rating: 4.8,
        featured: true,
        best: true,
        description: "A flattering ribbed top with a soft hand feel and a versatile silhouette made for day-to-night styling."
    },
    {
        id: "cobalt-poplin-top",
        name: "Cobalt Poplin Top",
        category: "Women",
        type: "Tops",
        price: 1799,
        image: "wn5.webp",
        badge: "Trending",
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.9,
        best: true,
        description: "A crisp poplin statement in saturated cobalt, cut with a contemporary shape and considered volume."
    },
    {
        id: "soft-form-blouse",
        name: "Soft Form Blouse",
        category: "Women",
        type: "Tops",
        price: 1999,
        image: "wn6.webp",
        sizes: ["XS", "S", "M", "L"],
        rating: 4.6,
        description: "Fluid fabric and gentle tailoring meet in a polished blouse that feels as relaxed as it looks refined."
    },
    {
        id: "lilac-studio-tee",
        name: "Lilac Studio Tee",
        category: "Unisex",
        type: "T-Shirts",
        price: 1299,
        image: "tr3.webp",
        badge: "Unisex",
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.8,
        best: true,
        description: "A substantial cotton tee with a boxy unisex cut, dropped shoulders and a washed lilac finish."
    },
    {
        id: "noir-city-jacket",
        name: "Noir City Jacket",
        category: "Unisex",
        type: "Outerwear",
        price: 3499,
        image: "mian2.png",
        badge: "Editor’s pick",
        sizes: ["S", "M", "L"],
        rating: 4.9,
        fit: "contain",
        best: true,
        description: "A clean black moto-inspired layer with a streamlined fit, designed to sharpen everyday looks without feeling heavy."
    },
    {
        id: "rouge-statement-jacket",
        name: "Rouge Statement Jacket",
        category: "Women",
        type: "Outerwear",
        price: 3799,
        image: "hero-2.png",
        badge: "Statement",
        sizes: ["XS", "S", "M", "L"],
        rating: 4.7,
        description: "A vivid textured jacket for maximal-impact layering, balanced with an easy cropped shape."
    },
    {
        id: "ivory-occasion-dress",
        name: "Ivory Occasion Dress",
        category: "Women",
        type: "Dresses",
        price: 4299,
        image: "tr1.webp",
        badge: "Occasion",
        sizes: ["XS", "S", "M", "L"],
        rating: 4.9,
        description: "An elegant ivory dress with detailed texture and graceful movement, created for celebrations and special moments."
    }
];

const CART_KEY = "fashionfunks-cart-v3";
const USER_KEY = "fashionfunks-user";
const ORDER_KEY = "fashionfunks-last-order";

const addIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14"></path>
    </svg>`;

const searchIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7"></circle>
        <path d="m20 20-4-4"></path>
    </svg>`;

function formatMoney(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getCart() {
    try {
        const parsed = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function getProduct(id) {
    return PRODUCTS.find((product) => product.id === id);
}

function getCartDetails() {
    return getCart()
        .map((item) => ({ ...item, product: getProduct(item.id) }))
        .filter((item) => item.product);
}

function getSubtotal() {
    return getCartDetails().reduce((total, item) => total + item.product.price * item.quantity, 0);
}

function getShipping(subtotal) {
    return subtotal === 0 || subtotal >= 2999 ? 0 : 199;
}

function updateCartCount() {
    const count = getCart().reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll("[data-cart-count]").forEach((element) => {
        element.textContent = String(count);
        element.hidden = count === 0;
    });
}

function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function addToCart(id, size) {
    const product = getProduct(id);
    if (!product) return;

    const selectedSize = size || product.sizes[0];
    const cart = getCart();
    const existing = cart.find((item) => item.id === id && item.size === selectedSize);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, size: selectedSize, quantity: 1 });
    }

    saveCart(cart);
    showToast(`${product.name} added to your bag`);
}

function productCard(product) {
    const fitClass = product.fit === "contain" ? "is-contain" : "";
    const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : "";

    return `
        <article class="product-card">
            <div class="product-media">
                <a href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHTML(product.name)}">
                    <img class="${fitClass}" src="${product.image}" alt="${escapeHTML(product.name)}" loading="lazy">
                </a>
                ${badge}
                <button class="quick-add" type="button" data-add-product="${product.id}" aria-label="Add ${escapeHTML(product.name)} to bag">
                    ${addIcon}
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category} · ${product.type}</span>
                <a class="product-name" href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
                <span class="product-price">${formatMoney(product.price)}</span>
            </div>
        </article>`;
}

function renderProductGrids() {
    document.querySelectorAll("[data-product-grid]").forEach((grid) => {
        const mode = grid.dataset.productGrid;
        let products = PRODUCTS;

        if (mode === "featured") products = PRODUCTS.filter((product) => product.featured).slice(0, 4);
        if (mode === "best") products = PRODUCTS.filter((product) => product.best).slice(0, 4);

        grid.innerHTML = products.map(productCard).join("");
    });
}

function initHeader() {
    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".primary-nav");

    if (menuButton && nav) {
        const closeMenu = () => {
            menuButton.setAttribute("aria-expanded", "false");
            nav.classList.remove("is-open");
            document.body.classList.remove("menu-open");
        };

        menuButton.addEventListener("click", () => {
            const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
            menuButton.setAttribute("aria-expanded", String(willOpen));
            nav.classList.toggle("is-open", willOpen);
            document.body.classList.toggle("menu-open", willOpen);
        });

        nav.addEventListener("click", closeMenu);
        window.addEventListener("resize", () => {
            if (window.innerWidth > 820) closeMenu();
        });
    }

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
        user = null;
    }

    document.querySelectorAll("[data-account-label]").forEach((label) => {
        if (user?.name) {
            label.textContent = user.name.split(" ")[0];
        }
    });

    updateCartCount();
}

function initGlobalActions() {
    document.addEventListener("click", (event) => {
        const addButton = event.target.closest("[data-add-product]");
        if (addButton) {
            addToCart(addButton.dataset.addProduct, addButton.dataset.size);
        }
    });

    document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const note = form.parentElement.querySelector(".newsletter-note");
            if (note) note.textContent = "You’re on the list. Fresh edits are heading your way.";
            form.reset();
        });
    });
}

function initShop() {
    const grid = document.querySelector("[data-shop-grid]");
    if (!grid) return;

    const resultCount = document.querySelector("[data-result-count]");
    const search = document.querySelector("[data-shop-search]");
    const sort = document.querySelector("[data-shop-sort]");
    const pills = [...document.querySelectorAll("[data-category]")];
    const params = new URLSearchParams(window.location.search);
    let category = params.get("category") || "All";
    let query = params.get("q") || "";

    if (search) search.value = query;

    function render() {
        let products = PRODUCTS.filter((product) => {
            const categoryMatch = category === "All" || product.category === category;
            const searchText = `${product.name} ${product.category} ${product.type}`.toLowerCase();
            return categoryMatch && searchText.includes(query.trim().toLowerCase());
        });

        if (sort?.value === "price-low") products.sort((a, b) => a.price - b.price);
        if (sort?.value === "price-high") products.sort((a, b) => b.price - a.price);
        if (sort?.value === "rating") products.sort((a, b) => b.rating - a.rating);

        pills.forEach((pill) => pill.classList.toggle("is-active", pill.dataset.category === category));
        if (resultCount) resultCount.textContent = `${products.length} ${products.length === 1 ? "piece" : "pieces"}`;

        if (!products.length) {
            grid.innerHTML = `
                <div class="catalog-empty" style="grid-column: 1 / -1">
                    <h2>No exact matches</h2>
                    <p>Try another search or switch to a different collection.</p>
                    <button class="button button-primary" type="button" data-clear-filters>View everything</button>
                </div>`;
            return;
        }

        grid.innerHTML = products.map(productCard).join("");
    }

    pills.forEach((pill) => {
        pill.addEventListener("click", () => {
            category = pill.dataset.category;
            render();
        });
    });

    search?.addEventListener("input", () => {
        query = search.value;
        render();
    });

    sort?.addEventListener("change", render);

    grid.addEventListener("click", (event) => {
        if (event.target.closest("[data-clear-filters]")) {
            category = "All";
            query = "";
            if (search) search.value = "";
            render();
        }
    });

    render();
}

function initProductPage() {
    const root = document.querySelector("[data-product-detail]");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const product = getProduct(params.get("id")) || PRODUCTS[0];
    let selectedSize = product.sizes[0];
    const fitClass = product.fit === "contain" ? "is-contain" : "";

    document.title = `${product.name} · FashionFunks`;
    root.innerHTML = `
        <div class="breadcrumbs">
            <a href="index.html">Home</a><span>/</span>
            <a href="shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a><span>/</span>
            <span>${product.name}</span>
        </div>
        <div class="product-detail">
            <div class="product-detail-media">
                <img class="${fitClass}" src="${product.image}" alt="${escapeHTML(product.name)}">
            </div>
            <div class="product-copy">
                <p class="eyebrow">${product.category} · ${product.type}</p>
                <h1>${product.name}</h1>
                <div class="product-rating">★★★★★ <span>${product.rating} / 5</span></div>
                <p class="product-detail-price">${formatMoney(product.price)}</p>
                <p class="product-description">${product.description}</p>
                <div class="choice-group">
                    <div class="choice-label"><span>Select size</span><span>True to size</span></div>
                    <div class="size-options">
                        ${product.sizes.map((size, index) => `<button class="size-option ${index === 0 ? "is-selected" : ""}" type="button" data-size="${size}">${size}</button>`).join("")}
                    </div>
                </div>
                <div class="button-row">
                    <button class="button button-cobalt button-block" type="button" data-product-page-add>Add to bag · ${formatMoney(product.price)}</button>
                </div>
                <div class="product-perks">
                    <div><span>✓</span><span>Easy 15-day returns</span></div>
                    <div><span>✓</span><span>Free delivery on orders above ₹2,999</span></div>
                    <div><span>✓</span><span>Secure demo shopping experience</span></div>
                </div>
            </div>
        </div>`;

    root.querySelectorAll("[data-size]").forEach((button) => {
        button.addEventListener("click", () => {
            selectedSize = button.dataset.size;
            root.querySelectorAll("[data-size]").forEach((sizeButton) => sizeButton.classList.remove("is-selected"));
            button.classList.add("is-selected");
        });
    });

    root.querySelector("[data-product-page-add]")?.addEventListener("click", () => addToCart(product.id, selectedSize));
}

function renderCart() {
    const cartRoot = document.querySelector("[data-cart-root]");
    const summaryRoot = document.querySelector("[data-cart-summary]");
    if (!cartRoot || !summaryRoot) return;

    const items = getCartDetails();

    if (!items.length) {
        cartRoot.innerHTML = `
            <div class="empty-state">
                <h2>Your bag is ready for a first pick</h2>
                <p>Explore the new edit and add a piece you’ll reach for again and again.</p>
                <a class="button button-primary" href="shop.html">Shop the collection</a>
            </div>`;
        summaryRoot.innerHTML = "";
        return;
    }

    cartRoot.innerHTML = `
        <div class="cart-list">
            ${items.map((item) => {
                const product = item.product;
                const fitClass = product.fit === "contain" ? "is-contain" : "";
                return `
                    <article class="cart-item">
                        <a class="cart-item-image" href="product.html?id=${product.id}">
                            <img class="${fitClass}" src="${product.image}" alt="${escapeHTML(product.name)}">
                        </a>
                        <div class="cart-item-info">
                            <span class="product-category">${product.category} · ${product.type}</span>
                            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                            <p>Size ${item.size}</p>
                            <div class="quantity-control" aria-label="Quantity for ${escapeHTML(product.name)}">
                                <button type="button" data-cart-quantity="-1" data-cart-id="${product.id}" data-cart-size="${item.size}" aria-label="Decrease quantity">−</button>
                                <span>${item.quantity}</span>
                                <button type="button" data-cart-quantity="1" data-cart-id="${product.id}" data-cart-size="${item.size}" aria-label="Increase quantity">+</button>
                            </div>
                        </div>
                        <div class="cart-item-side">
                            <strong>${formatMoney(product.price * item.quantity)}</strong>
                            <button class="remove-button" type="button" data-cart-remove data-cart-id="${product.id}" data-cart-size="${item.size}">Remove</button>
                        </div>
                    </article>`;
            }).join("")}
        </div>`;

    const subtotal = getSubtotal();
    const shipping = getShipping(subtotal);
    summaryRoot.innerHTML = summaryMarkup(subtotal, shipping, "checkout.html", "Continue to checkout");
}

function summaryMarkup(subtotal, shipping, buttonHref, buttonText) {
    return `
        <aside class="summary-card">
            <h2>Order summary</h2>
            <div class="summary-line"><span>Subtotal</span><strong>${formatMoney(subtotal)}</strong></div>
            <div class="summary-line"><span>Delivery</span><strong>${shipping ? formatMoney(shipping) : "Free"}</strong></div>
            <div class="summary-line total"><span>Total</span><strong>${formatMoney(subtotal + shipping)}</strong></div>
            <a class="button button-cobalt button-block" href="${buttonHref}" style="margin-top: 24px">${buttonText}</a>
            <p class="summary-note">Taxes are included. This is a demonstration store, so no real payment will be collected.</p>
        </aside>`;
}

function initCart() {
    const cartRoot = document.querySelector("[data-cart-root]");
    if (!cartRoot) return;

    cartRoot.addEventListener("click", (event) => {
        const quantityButton = event.target.closest("[data-cart-quantity]");
        const removeButton = event.target.closest("[data-cart-remove]");

        if (quantityButton) {
            const cart = getCart();
            const item = cart.find((entry) => entry.id === quantityButton.dataset.cartId && entry.size === quantityButton.dataset.cartSize);
            if (item) item.quantity += Number(quantityButton.dataset.cartQuantity);
            saveCart(cart.filter((entry) => entry.quantity > 0));
            renderCart();
        }

        if (removeButton) {
            const cart = getCart().filter((entry) => !(entry.id === removeButton.dataset.cartId && entry.size === removeButton.dataset.cartSize));
            saveCart(cart);
            renderCart();
        }
    });

    renderCart();
}

function initCheckout() {
    const itemsRoot = document.querySelector("[data-checkout-items]");
    const summaryRoot = document.querySelector("[data-checkout-summary]");
    const orderButton = document.querySelector("[data-place-order]");
    if (!itemsRoot || !summaryRoot || !orderButton) return;

    const items = getCartDetails();
    if (!items.length) {
        itemsRoot.innerHTML = `
            <div class="empty-state">
                <h2>There’s nothing to order yet</h2>
                <p>Add something to your bag, then come back for the one-click demo checkout.</p>
                <a class="button button-primary" href="shop.html">Go to shop</a>
            </div>`;
        summaryRoot.innerHTML = "";
        orderButton.hidden = true;
        return;
    }

    itemsRoot.innerHTML = items.map((item) => `
        <article class="checkout-item">
            <img src="${item.product.image}" alt="${escapeHTML(item.product.name)}">
            <div><h3>${item.product.name}</h3><p>Size ${item.size} · Qty ${item.quantity}</p></div>
            <strong>${formatMoney(item.product.price * item.quantity)}</strong>
        </article>`).join("");

    const subtotal = getSubtotal();
    const shipping = getShipping(subtotal);
    summaryRoot.innerHTML = `
        <aside class="summary-card">
            <h2>Final total</h2>
            <div class="summary-line"><span>Subtotal</span><strong>${formatMoney(subtotal)}</strong></div>
            <div class="summary-line"><span>Delivery</span><strong>${shipping ? formatMoney(shipping) : "Free"}</strong></div>
            <div class="summary-line total"><span>Total</span><strong>${formatMoney(subtotal + shipping)}</strong></div>
            <p class="summary-note">No address, card or payment details are required for this demo order.</p>
        </aside>`;

    orderButton.addEventListener("click", () => {
        const order = {
            number: `FF${Date.now().toString().slice(-7)}`,
            total: subtotal + shipping,
            itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
            placedAt: new Date().toISOString()
        };
        localStorage.setItem(ORDER_KEY, JSON.stringify(order));
        localStorage.removeItem(CART_KEY);
        window.location.href = "order-success.html";
    });
}

function initSuccess() {
    const root = document.querySelector("[data-order-success]");
    if (!root) return;

    let order = null;
    try {
        order = JSON.parse(localStorage.getItem(ORDER_KEY));
    } catch {
        order = null;
    }

    if (!order) {
        root.innerHTML = `
            <div class="success-card">
                <div class="success-icon">✓</div>
                <h1>You’re all set.</h1>
                <p>This page is ready for your next demo order.</p>
                <div class="button-row"><a class="button button-primary" href="shop.html">Start shopping</a></div>
            </div>`;
        return;
    }

    root.innerHTML = `
        <div class="success-card">
            <div class="success-icon">✓</div>
            <p class="eyebrow" style="justify-content:center">Order confirmed</p>
            <h1>It’s officially yours.</h1>
            <p>Your demo order for ${order.itemCount} ${order.itemCount === 1 ? "piece" : "pieces"} has been placed. No payment was collected and no personal information was needed.</p>
            <div class="order-chip">ORDER ${escapeHTML(order.number)} · ${formatMoney(order.total)}</div>
            <div class="button-row">
                <a class="button button-primary" href="shop.html">Keep exploring</a>
                <a class="button button-secondary" href="index.html">Back home</a>
            </div>
        </div>`;
}

function initLogin() {
    const form = document.querySelector("[data-login-form]");
    if (!form) return;

    const nameInput = form.querySelector("[name='name']");
    const emailInput = form.querySelector("[name='email']");
    try {
        const user = JSON.parse(localStorage.getItem(USER_KEY));
        if (user?.name) nameInput.value = user.name;
        if (user?.email) emailInput.value = user.email;
    } catch {
        // Keep the namesake form empty when saved data is unavailable.
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const user = { name: nameInput.value.trim(), email: emailInput.value.trim() };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        const requestedNext = new URLSearchParams(window.location.search).get("next") || "index.html";
        const safeNext = requestedNext.includes("://") || requestedNext.startsWith("//") ? "index.html" : requestedNext;
        window.location.href = safeNext;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initGlobalActions();
    renderProductGrids();
    initShop();
    initProductPage();
    initCart();
    initCheckout();
    initSuccess();
    initLogin();
});
