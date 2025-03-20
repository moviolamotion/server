<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vorname = htmlspecialchars($_POST["vorname"]);
    $nachname = htmlspecialchars($_POST["nachname"]);
    $email = htmlspecialchars($_POST["email"]);
    $nachricht = htmlspecialchars($_POST["nachricht"]);

    $to = "moviolamotion@gmail.com";
    $subject = "Neue Nachricht von $vorname $nachname";
    $message = "Von: $vorname $nachname\nE-Mail: $email\n\nNachricht:\n$nachricht";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Erfolgreich gesendet!";
    } else {
        echo "Fehler beim Senden.";
    }
}
?>
