// ===============================
// Inventory Scanner V2
// QR Scanner + Google Sheet
// ===============================


let currentMode = "IN";


// Google Sheet Web App URL

const GOOGLE_URL =
"https://script.google.com/macros/s/AKfycbwXL948q6a3fBEDv_2XgNsYFRmB317QCKsnor6zLGhQDHbd3glIuACEBPwlaBgga6B_/exec";





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

    modeBanner.innerHTML =
    "🟢 CURRENT MODE : IN";

};



btnOut.onclick = function(){

    currentMode = "OUT";

    btnOut.classList.add("active");
    btnIn.classList.remove("active");

    modeBanner.innerHTML =
    "🔴 CURRENT MODE : OUT";

};






// ===============================
// QR SCANNER
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
            qrbox: undefined
        },


        function(decodedText){


            console.log("SCAN:",decodedText);



            document.getElementById("barcode").value =
            decodedText;



            // stop camera

            scanner.stop();



        },


        function(errorMessage){

        }


    );


}




// ===============================
// SUBMIT TO GOOGLE SHEET
// ===============================


document.getElementById("submitBtn").onclick =
function(){



    let data = {


        barcode:
        document.getElementById("barcode").value,


        mode:
        currentMode,


        batch:
        document.getElementById("batch").value,


        pieces:
        document.getElementById("pieces").value,


        cartons:
        document.getElementById("cartons").value,


        qty:
        document.getElementById("qty").value,


        writer:
        document.getElementById("writer").value


    };




    fetch(GOOGLE_URL, {


        method:"POST",


        body:JSON.stringify(data)


    })



    .then(response=>response.json())


    .then(result=>{


        alert("✅ Saved to Google Sheet");


        console.log(result);


    })



    .catch(error=>{


        alert("❌ Error");


        console.log(error);


    });



};






// ===============================
// START CAMERA
// ===============================


window.onload=function(){

    startScanner();

};
