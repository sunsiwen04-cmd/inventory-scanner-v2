// =========================
// Inventory Scanner V2
// =========================

let transactionMode = "IN";

// Elements
const btnIn = document.getElementById("btnIn");
const btnOut = document.getElementById("btnOut");
const modeBanner = document.getElementById("modeBanner");

// ---------- Default ----------
setMode("IN");

// ---------- Events ----------
btnIn.addEventListener("click", () => {
    setMode("IN");
});

btnOut.addEventListener("click", () => {
    setMode("OUT");
});

// ---------- Functions ----------
function setMode(mode){

    transactionMode = mode;

    if(mode === "IN"){

        modeBanner.innerHTML = "🟢 CURRENT MODE : IN";
        modeBanner.style.background = "#16a34a";

        btnIn.classList.add("active");
        btnOut.classList.remove("active");

        btnIn.innerHTML = "🟢 IN";
        btnOut.innerHTML = "⚪ OUT";

    }
    else{

        modeBanner.innerHTML = "🔴 CURRENT MODE : OUT";
        modeBanner.style.background = "#dc2626";

        btnOut.classList.add("active");
        btnIn.classList.remove("active");

        btnOut.innerHTML = "🔴 OUT";
        btnIn.innerHTML = "⚪ IN";

    }

    console.log("Current Mode :", transactionMode);

}
