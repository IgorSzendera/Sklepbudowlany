// koszyk.js

// Funkcja globalna dodająca produkt do koszyka
window.dodajDoKoszyka = function(nazwa, cena, zdjecie, kategoria) {
    const koszyk = JSON.parse(localStorage.getItem("koszyk")) || [];
    koszyk.push({ 
        nazwa, 
        cena, 
        zdjecie,
        kategoria
    });
    localStorage.setItem("koszyk", JSON.stringify(koszyk));

    // Aktualizuj licznik w koszyku (jeśli istnieje)
    const koszykLicznik = document.getElementById("koszyk-licznik");
    if (koszykLicznik) {
        koszykLicznik.textContent = koszyk.length;
    }

    alert("Produkt dodany do koszyka!");
};

// Funkcja wyświetlająca koszyk (TYLKO na stronie koszyk.html)
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("koszyk.html")) {
        const wyswietlKoszyk = function() {
            const koszyk = JSON.parse(localStorage.getItem("koszyk")) || [];
            const koszykLista = document.getElementById("koszyk-lista");
            const koszykCena = document.getElementById("koszyk-cena");
            const koszykLicznik = document.getElementById("koszyk-licznik");

            if (!koszykLista || !koszykCena || !koszykLicznik) return;

            koszykLista.innerHTML = "";
            let suma = 0;

            koszyk.forEach((produkt, index) => {
                const produktElement = document.createElement("div");
                produktElement.className = "koszyk-produkt";
                produktElement.innerHTML = `
                    <img src="zdjecia/${produkt.kategoria}/${produkt.zdjecie}" alt="${produkt.nazwa}" class="auto-zdjecie">
                    <h3>${produkt.nazwa}</h3>
                    <p class="cena">Cena: ${produkt.cena} zł</p>
                    <button onclick="usunZKoszyka(${index})">🗑️ Usuń</button>
                `;
                koszykLista.appendChild(produktElement);
                suma += parseFloat(produkt.cena);
            });

            koszykCena.textContent = `${suma.toFixed(2)} zł`;
            koszykLicznik.textContent = koszyk.length;
        };

        window.usunZKoszyka = function(index) {
            const koszyk = JSON.parse(localStorage.getItem("koszyk")) || [];
            koszyk.splice(index, 1);
            localStorage.setItem("koszyk", JSON.stringify(koszyk));
            wyswietlKoszyk();
        };

        // Obsługa przycisku "Przejdź do płatności"
        document.getElementById("przejdz-do-platnosci").addEventListener("click", function() {
            document.getElementById("zamowienieForm").style.display = "block";
        });

        // Obsługa formularza zamówienia
        document.getElementById("zamowienieForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Zapobiega domyślnej akcji wysłania formularza

            // Wyświetlenie alertu potwierdzającego
            alert("Zamówienie zostało złożone! Dziękujemy za zakupy.");

            // Czyszczenie koszyka
            localStorage.removeItem("koszyk");
            wyswietlKoszyk();

            // Czyszczenie formularza
            document.getElementById("zamowienieForm").reset();

            // Ukrycie formularza po złożeniu zamówienia
            document.getElementById("zamowienieForm").style.display = "none";
        });

        wyswietlKoszyk();
    }
});