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
// SCAN SOUND
// ===============================


function scanBeep(){

    let sound = document.getElementById("scanSound");

    if(sound){

        sound.currentTime = 0;

        sound.play()
        .catch(function(error){

            console.log("Sound blocked:", error);

        });

    }

}




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



            // 🔊 scan beep

            scanBeep();



            // auto input barcode

            document.getElementById("barcode").value = decodedText;



            // stop after scan

            scanner.stop();



        },


        function(errorMessage){

            // keep scanning

        }


    )


    .catch(function(err){

        console.log("Camera Error:",err);

    });


}




// ===============================
// START CAMERA
// ===============================


window.onload = function(){

    startScanner();

};
