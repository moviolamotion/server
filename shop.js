document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    function updateCart() {
        cartContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalPrice += item.price * item.hours;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>${item.price}€ / Stunde</p>
                    <input type="number" value="${item.hours}" min="1" data-index="${index}">
                    <p>Gesamt: ${item.price * item.hours}€</p>
                    <button class="remove-btn" data-index="${index}">Entfernen</button>
                </div>
            `;
        });

        totalPriceElement.innerText = totalPrice;
        localStorage.setItem("cart", JSON.stringify(cart)); // Speichert den Warenkorb für `checkout.html`
    }

    cartContainer.addEventListener("input", function (event) {
        if (event.target.tagName === "INPUT") {
            let index = event.target.getAttribute("data-index");
            cart[index].hours = parseInt(event.target.value);
            updateCart();
        }
    });

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        }
    });

    document.getElementById("checkout-btn").addEventListener("click", function () {
        window.location.href = "checkout.html"; // Leitet zur Kasse weiter
    });

    updateCart();
});
