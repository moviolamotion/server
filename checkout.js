const stripe = Stripe("pk_live_51R440fFaOyPdwLGv0sPqcbNeurCp0vw38fICLsHK0Min7tpjHjBpm77UwRucBO0FK4GOUDhMl8eKUt933lvrQoFQ00OgJp9M7x"); // DEIN STRIPE PUBLIC KEY!

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.hours;
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - ${item.hours}h x ${item.price}€ = ${item.price * item.hours}€`;

        cartSummary.appendChild(listItem);
    });

    totalPriceElement.innerText = totalPrice;

    document.getElementById("pay-button").addEventListener("click", async () => {
        try {
            const response = await fetch("http://localhost:3333/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart }) 
            });

            const session = await response.json();
            if (!session.url) {
                throw new Error("Fehler: Keine Session-URL erhalten!");
            }
            window.location.href = session.url;
        } catch (error) {
            console.error("❌ Fehler beim Checkout:", error);
            alert("Zahlung fehlgeschlagen. Überprüfe die Konsole.");
        }
    });
});
