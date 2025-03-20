// koszyk.js

// Funkcja globalna dodająca produkt do koszyka
window.dodajDoKoszyka = function(nazwa, cena, zdjecie) {
    const koszyk = JSON.parse(localStorage.getItem("koszyk")) || [];
    koszyk.push({ nazwa, cena, zdjecie });
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
                    <img src="zdjecia/budownictwo/${produkt.zdjecie}" alt="${produkt.nazwa}" class="auto-zdjecie">
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

        wyswietlKoszyk();
    }
});