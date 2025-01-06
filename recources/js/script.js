
        // NIJNTJE PRRR // NIJNTJE PRRR // NIJNTJE PRRR // NIJNTJE PRRR // NIJNTJE PRRR // NIJNTJE PRRR // NIJNTJE PRRR // NIJNTJE PRRR
        const audio = new Audio('./recources/audio/nijntje-prrr.mp3');

        // Event listener voor het afspelen van het audio- en bericht
        document.getElementById('playNijntjePrrr').addEventListener('click', showNijntjePrrr);

        function showNijntjePrrr() {
            // Speel het audio-bestand af
            audio.play();

            // Toon het bericht
            const message = document.getElementById('nijntje-prrr');
            message.style.display = 'flex';

            // Verberg het bericht na 5 seconden
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);

            // Toon de stop-knop na 5 seconden en verberg deze na 10 seconden
            const stopNijntjePrrr = document.getElementById('stopNijntjePrrr');
            setTimeout(() => {
                stopNijntjePrrr.style.display = 'flex';

                // Verberg de knop na 10 seconden automatisch
                setTimeout(() => {
                    stopNijntjePrrr.style.display = 'none';
                }, 5000);

            }, 5000);
        }

        // Functie om het geluid te stoppen
        function stopSound() {
            audio.pause();
            audio.currentTime = 0;
            document.getElementById('stopNijntjePrrr').style.display = 'none';
        }

        // Event listener voor het stoppen van het geluid
        document.getElementById('stopNijntjePrrr').addEventListener('click', stopSound);


        // DIT HAD NIJNTJE ER ZELF OVER TE ZEGGEN // DIT HAD NIJNTJE ER ZELF OVER TE ZEGGEN // DIT HAD NIJNTJE ER ZELF OVER TE ZEGGEN // DIT HAD NIJNTJE ER ZELF OVER TE ZEGGEN 
        // Selecteer zowel p-right als p-left en zet ze in een array
        const elements = [
            document.querySelector('.span-right'),
            document.querySelector('.span-left')
        ];

        // Bewaar de oorspronkelijke tekst voor elk element
        const originalTexts = elements.map(element => element.innerHTML);

        function toggleTextOnClick(element, toggleText, originalText) {
            // Controleer de huidige tekst en wissel tussen het toggleText en de originele tekst
            if (element.innerHTML === originalText) {
                element.innerHTML = toggleText;
            } else {
                element.innerHTML = originalText;
            }
        }

        // Voeg event listeners toe voor elk element in de array
        elements.forEach((element, index) => {
            const originalText = originalTexts[index];

            element.addEventListener('click', function () {
                toggleTextOnClick(element, '(Dit had Nijntje er zelf over te zeggen!)', originalText);
            });
        });


        // SWITCH IMAGE // SWITCH IMAGE // SWITCH IMAGE // SWITCH IMAGE // SWITCH IMAGE // SWITCH IMAGE // SWITCH IMAGE // SWITCH IMAGE // SWITCH IMAGE 
        const images = document.querySelectorAll("#photobook-container img");
        const displayContainer = document.querySelector(".nijntje-photo");

        // Iterate over the NodeList and add the click event listener to each image
        images.forEach((img) => {
            img.addEventListener("click", function () {
                // Create a new image element to display
                const clickedImage = document.createElement("img");
                clickedImage.src = img.src; // Use the src of the clicked image
                clickedImage.alt = img.alt; // Use the alt text of the clicked image

                // Clear the display container and append the new image
                displayContainer.innerHTML = ""; // Clear previous image
                displayContainer.appendChild(clickedImage); // Append the clicked image

            });
        });
        


        // TOGGLE PHOTOBOOK // TOGGLE PHOTOBOOK // TOGGLE PHOTOBOOK // TOGGLE PHOTOBOOK // TOGGLE PHOTOBOOK // TOGGLE PHOTOBOOK // TOGGLE PHOTOBOOK
        document.getElementById("toggleButton").addEventListener("click", function () {
            const div = document.getElementById("photobook-container");
            const header = document.querySelector(".photo-section button");
            let orginal = document.querySelector(".nijntje-photo img");
            let orignal = orginal.outerHTML;

            if (div.classList.contains("hidden")) {
                div.classList.remove("hidden");
                div.classList.add("grid");
                header.setAttribute("aria-expanded", "true");
                header.textContent = "Minder foto's van Nijntje";
            }

            else {
                div.classList.remove("grid");
                div.classList.add("hidden");
                header.setAttribute("aria-expanded", "false");
                header.textContent = "Meer foto's van Nijntje";
                document.querySelector(".nijntje-photo").innerHTML = '<img src="./recources/images/Nijntje-photo.png" alt="Nijntje met een pootje over de bank">';
                console.log(orginal);
            }

        });


        // API MESSAGEBOARD // API MESSAGEBOARD // API MESSAGEBOARD // API MESSAGEBOARD // API MESSAGEBOARD // API MESSAGEBOARD // API MESSAGEBOARD
        document.addEventListener('DOMContentLoaded', function () {
            const messageList = document.querySelector('#message-list');
            const messageForm = document.querySelector('#message-form');
            const usernameInput = document.querySelector('input[name="username"]');
            const contentInput = document.querySelector('textarea[name="content"]');

            // Functie om berichten op te halen
            function fetchMessages() {
                fetch('https://gielvangaal.nl/board/api/messages/')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        messageList.innerHTML = '';
                        data.reverse();
                        data.forEach(message => {
                            const listItem = document.createElement('li');
                            listItem.innerHTML = `<strong>${message.username}</strong> - ${message.formatted_date} - ${message.formatted_time}<br> ${message.content}`;
                            listItem.classList.add('message-item');
                            messageList.appendChild(listItem);
                        });
                    });
            }

            // Functie om een nieuw bericht te versturen
            messageForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const messageData = {
                    username: usernameInput.value,
                    content: contentInput.value,
                };

                fetch('https://gielvangaal.nl/board/api/messages/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': '{{ csrf_token }}' // Zorg ervoor dat je een CSRF-token toevoegt
                    },
                    body: JSON.stringify(messageData)
                })
                    .then(response => response.json())
                    .then(data => {
                        fetchMessages(); // Herlaad de berichten na het verzenden van een nieuw bericht
                        messageForm.reset(); // Formulier leegmaken
                    });
            });

            // Initialiseer de berichten bij het laden van de pagina
            fetchMessages();
        });

        // CONTACTFORM // CONTACTFORM // CONTACTFORM // CONTACTFORM // CONTACTFORM // CONTACTFORM // CONTACTFORM // CONTACTFORM // CONTACTFORM
        document.getElementById("contactForm").addEventListener("submit", async (e) => {
            e.preventDefault(); // Voorkomt het standaard submit gedrag

            const form = e.target; // Het formulier dat is verzonden
            const formDataObj = {}; // Object om de formuliergegevens op te slaan
            new FormData(form).forEach((value, key) => {
                formDataObj[key] = value;
            });

            console.log(formDataObj); // Log de gegevens voor debuggen

            // Zet het object om naar een URL-gecodeerde string
            const urlEncodedData = new URLSearchParams(formDataObj).toString();

            try {
                const response = await fetch(form.action, {
                    method: form.method, // Gebruik de methode die in het formulier is gespecificeerd
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Geef aan dat we URL-gecodeerde gegevens verzenden
                    },
                    body: urlEncodedData, // Gebruik de URL-gecodeerde gegevens
                });

                const message = await response.text(); // Haal de response-tekst op
                document.getElementById("responseMessage").innerText = message; // Laat de response-tekst zien in de HTML

            } catch (error) {
                console.error("Error:", error);
                document.getElementById("responseMessage").innerText = "Fout bij het verzenden van het bericht.";
            }
        });


        // TOGGLE MENU // TOGGLE MENU // TOGGLE MENU // TOGGLE MENU // TOGGLE MENU // TOGGLE MENU // TOGGLE MENU // TOGGLE MENU // TOGGLE MENU 
        document.getElementById("toggleMenu").onclick = function () {
            const menu = document.getElementById("menu");
            if (menu.style.display === "none" || menu.style.display === "") {
                menu.style.display = "flex";
            } else {
                menu.style.display = "none";
            }
        };


        // CLOSE MENU // CLOSE MENU // CLOSE MENU // CLOSE MENU // CLOSE MENU // CLOSE MENU // CLOSE MENU // CLOSE MENU // CLOSE MENU // CLOSE MENU 
        document.querySelectorAll("#menu a").forEach((link) => {
            link.onclick = function () {
                document.getElementById("menu").style.display = "none";
            };
        });

        document.getElementById("contactBtn").addEventListener("click", function () {
            document.getElementById("menu").style.display = "none"
        });


        // TOGGLE MESSAGE FORM // TOGGLE MESSAGE FORM // TOGGLE MESSAGE FORM // TOGGLE MESSAGE FORM // TOGGLE MESSAGE FORM // TOGGLE MESSAGE FORM
        const buttonsToggleMessageForm = document.getElementsByClassName("toggleMessageForm");
        const messageList = document.getElementById("message-list");
        Array.from(buttonsToggleMessageForm).forEach(button => {
            button.addEventListener("click", function () {
                const messageform = document.getElementById("message-form");
                if (messageform.style.display === "none" || messageform.style.display === "") {
                    messageform.style.display = "grid";
                    messageList.style.display = "none";

                } else {
                    messageform.style.display = "none";
                    messageList.style.display = "block";
                    
                }
            });
        });

        // CLOSE MESSAGE FORM X // CLOSE MESSAGE FORM X // CLOSE MESSAGE FORM X // CLOSE MESSAGE FORM X // CLOSE MESSAGE FORM X // CLOSE MESSAGE FORM X 
        const closeMessageFormX = document.getElementById("closeMessageFormX");

        closeMessageFormX.addEventListener("click", function () {
            const messageForm = document.getElementById("message-form");
            messageForm.style.display = "none";
            messageList.style.display = "block";

        });

        // CLOSE MESSAGE FORM POST // // CLOSE MESSAGE FORM POST // CLOSE MESSAGE FORM POST // CLOSE MESSAGE FORM POST // CLOSE MESSAGE FORM POST 
        const CloseMessageFormPost = document.getElementById("closeMessageFormPost");

        CloseMessageFormPost.addEventListener("click", function () {
            const messageForm = document.getElementById("message-form");

            if (messageForm.checkValidity()) {
                messageForm.style.display = "none";
                messageList.style.display = "block";
            } else {
                messageForm.reportValidity();
            }
        });




        // VIDEO AAN/UIT // VIDEO AAN/UIT // VIDEO AAN/UIT // VIDEO AAN/UIT // VIDEO AAN/UIT // VIDEO AAN/UIT // VIDEO AAN/UIT // VIDEO AAN/UIT 
        function toggleVideo() {
            const video = document.getElementById('background-video');
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }

        // OVER NIJNTJE TOGGLE // OVER NIJNTJE TOGGLE // OVER NIJNTJE TOGGLE // OVER NIJNTJE TOGGLE // OVER NIJNTJE TOGGLE // OVER NIJNTJE TOGGLE 
        document.getElementById('overNijntje').addEventListener('click', function () {
            const aboutModal = document.getElementById('aboutModal');
            const video = document.getElementById('background-video');

            // Toggle modal visibility
            if (aboutModal.style.display === 'grid') {
                aboutModal.style.display = 'none';
                video.play(); // Start video again when modal is closed
            } else {
                aboutModal.style.display = 'grid';
                video.pause(); // Pause video when modal is opened
            }
        });

