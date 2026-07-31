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

            // 不显示中间扫描框
            qrbox: undefined

        },


        function(decodedText){


            console.log("SCAN:", decodedText);



            // 自动输入 Barcode

            document.getElementById("barcode").value = decodedText;



            // 扫码成功自动停止

            scanner.stop()
            .then(function(){

                console.log("Scanner stopped");

            })
            .catch(function(err){

                console.log(err);

            });



        },


        function(errorMessage){

            // 继续扫描

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
