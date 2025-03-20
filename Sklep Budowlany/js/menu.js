document.addEventListener("DOMContentLoaded", function() {
    const kategorieBtn = document.querySelector(".kategorie");
    const menu = document.querySelector(".kategorie-menu");
    
    if (kategorieBtn && menu) {
        kategorieBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            menu.classList.toggle("open");
        });
        
        document.addEventListener("click", function(event) {
            if (!menu.contains(event.target) && !kategorieBtn.contains(event.target)) {
                menu.classList.remove("open");
            }
        });
    }
});