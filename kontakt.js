document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("kontaktFormular").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch("kontakt.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("form-feedback").textContent = "Deine Nachricht wurde erfolgreich gesendet!";
            document.getElementById("form-feedback").style.color = "green";
            this.reset();
        })
        .catch(error => {
            document.getElementById("form-feedback").textContent = "Es gab ein Problem beim Senden.";
            document.getElementById("form-feedback").style.color = "red";
        });
    });
});
