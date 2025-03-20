const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 10000; // Render erwartet eine PORT-Variable

app.use(express.static("public"));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Beispielprodukt",
            },
            unit_amount: 1200, // 12,00€
          },
          quantity: 1,
        },
      ],
      success_url: "https://checkout-server.onrender.com/success.html",
      cancel_url: "https://checkout-server.onrender.com/cancel.html",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
