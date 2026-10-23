
function getCart() {
    return JSON.parse(localStorage.getItem("mfCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("mfCart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(name, price = "Ask for price") {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart(cart);
    alert(name + " added to your cart!");
}

function updateCartCount() {
    const countElements = document.querySelectorAll(".cart-count");
    const cart = getCart();

    const total = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    countElements.forEach(element => {
        element.textContent = total;
    });
}

function removeFromCart(name) {
    const cart = getCart().filter(item => item.name !== name);
    saveCart(cart);
}

function changeQuantity(name, amount) {
    const cart = getCart();
    const item = cart.find(item => item.name === name);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        saveCart(cart.filter(product => product.name !== name));
    } else {
        saveCart(cart);
    }
}

function sendCartToWhatsApp() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello MF Online Store! I would like to order:\n\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity}\n`;
        message += `Price: ${item.price}\n\n`;
    });

    message += "Please confirm availability and the total price.";

    const url = "https://wa.me/96103611204?text="
        + encodeURIComponent(message);

    window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", updateCartCount);
