// ===============================
// Inventory Scanner V2
// QR Scanner + IN / OUT Control
// ===============================


let currentMode = "IN";


// ===============================
// IN / OUT BUTTON
// ===============================


const btnIn = document.getElementById("btnIn");
const btnOut = document.getElementById("btnOut");
const modeBanner = document.getElementById("modeBanner");



btnIn.onclick = function(){

    currentMode = "IN";

    btnIn.classList.add("active");
    btnOut.classList.remove("active");

    modeBanner.innerHTML = "🟢 CURRENT MODE : IN";

};




btnOut.onclick = function(){

    currentMode = "OUT";

    btnOut.classList.add("active");
    btnIn.classList.remove("active");

    modeBanner.innerHTML = "🔴 CURRENT MODE : OUT";

};





// ===============================
// QR CODE SCANNER
// ===============================


let scanner;


function startScanner(){


    scanner = new Html5Qrcode("reader");


    scanner.start(

        {
            facingMode:"environment"
        },


        {
            fps:10,
            qrbox:250
        },


        function(decodedText){


            console.log("SCAN:", decodedText);


            document.getElementById("barcode").value = decodedText;



            // stop after successful scan

            scanner.stop();



        },


        function(errorMessage){

            // scanning continues

        }


    )

    .catch(function(err){

        console.log("Camera Error:", err);

    });


}





// start camera when page load

window.onload = function(){

    startScanner();

};
