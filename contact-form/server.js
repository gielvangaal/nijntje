require('dotenv').config();

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);


const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Route om index.html te serveren
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // Verzend het index.html-bestand
});

// Route voor het contactformulier
app.post("/send", async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail", // Of een andere SMTP-service die je gebruikt
        auth: {
            user: process.env.EMAIL_USER, // Je Gmail-adres
            pass: process.env.EMAIL_PASS,   // Je Gmail-wachtwoord (overweeg een app-wachtwoord voor beveiliging)
        }
    });

    const mailOptions = {
        from: req.body.email, // Afzender e-mailadres
        to: process.env.EMAIL_USER, // Jouw e-mailadres
        subject: "Nieuw bericht van contactformulier",
        text: req.body.message // Berichtinhoud
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Bericht succesvol verzonden!");
    } catch (error) {
        console.error(error);
        res.send("Fout bij het verzenden van het bericht.");
    }
});

// Start de server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
