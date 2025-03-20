


const stripe = Stripe("pk_live_51R440fFaOyPdwLGv0sPqcbNeurCp0vw38fICLsHK0Min7tpjHjBpm77UwRucBO0FK4GOUDhMl8eKUt933lvrQoFQ00OgJp9M7x"); // Ersetze mit deinem echten Stripe Public Key

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    cartSummary.innerHTML = "";

    cart.forEach(item => {
        totalPrice += item.price * item.hours;
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - ${item.hours}h x ${item.price}€ = ${item.price * item.hours}€`;
        cartSummary.appendChild(listItem);
    });

    totalPriceElement.innerText = totalPrice;

    document.getElementById("pay-button").addEventListener("click", async () => {
        try {
            console.log("🛒 Sende Warenkorb an den Server:", cart);

            const response = await fetch("https://moviolamotion-stipe-server-1.onrender.com/create-checkout-session", {


                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart }) // Sende den Warenkorb an den Server
            });

            const session = await response.json();
            console.log("🔄 Antwort vom Server:", session); // Debugging

            if (!session.url) {
                throw new Error("Fehler: Keine Session-URL erhalten!");
            }

            // Weiterleitung zur Stripe-Checkout-Seite
            window.location.href = session.url;
        } catch (error) {
            console.error("❌ Fehler beim Checkout:", error);
            alert("Zahlung fehlgeschlagen. Überprüfe die Konsole.");
        }
    });
});
