const scriptURL = "https://script.google.com/macros/s/AKfycbweDuLhUy3rxAYwc4vnfkbUd8Pv4Y2IO0-3ziXNBHWqErssOat-mZ0d_zb_uCc8-t7Z/exec";

let currentMode = "IN";

let html5QrCode = null;


// =====================
// IN / OUT BUTTON
// =====================

document.getElementById("btnIn").onclick = function(){

    currentMode = "IN";

    document.getElementById("btnIn")
        .classList.add("active");

    document.getElementById("btnOut")
        .classList.remove("active");

    document.getElementById("modeBanner")
        .innerHTML = "🟢 CURRENT MODE : IN";
};


document.getElementById("btnOut").onclick = function(){

    currentMode = "OUT";

    document.getElementById("btnOut")
        .classList.add("active");

    document.getElementById("btnIn")
        .classList.remove("active");

    document.getElementById("modeBanner")
        .innerHTML = "🔴 CURRENT MODE : OUT";
};


// =====================
// START CAMERA
// =====================

html5QrCode = new Html5Qrcode("reader");

html5QrCode.start(

    { facingMode:"environment" },

    {
        fps:10
    },

    onScanSuccess,

    onScanFailure

)

.catch(err=>{

    console.log(err);

});


// =====================
// SCAN SUCCESS
// =====================

function onScanSuccess(decodedText){

    console.log("Scan:", decodedText);

    document.getElementById("barcode")
        .value = decodedText;


    // 清空之前的 Expiry
    clearExpiry();


    // 如果 Batch 已经填写
    // 直接查询
    const batch =
        document.getElementById("batch").value.trim();

        loadExpiryDates();

    }


    // 自动停止相机

    html5QrCode.stop()

    .then(()=>{

        console.log("Camera stopped");

    })

    .catch(err=>{

        console.log(err);

    });

}


function onScanFailure(error){

    // 不显示扫描错误

}


// =====================
// BATCH CHANGE
// =====================

document.getElementById("batch")
.addEventListener("change", function(){

    loadExpiryDates();

});


// 也支持员工输入完 Batch 后直接查询

document.getElementById("batch")
.addEventListener("blur", function(){

    loadExpiryDates();

});


// =====================
// LOAD EXPIRY DATES
// =====================

function loadExpiryDates(){

    const barcode =
        document.getElementById("barcode").value.trim();

    const batch =
        document.getElementById("batch").value.trim();


    // Barcode 或 Batch 没有填写
    if(barcode === "" || batch === ""){

        clearExpiry();

        return;

    }


    // 先清空旧日期

    clearExpiry();


    const url =
        scriptURL +
        "?action=inventory" +
        "&barcode=" +
        encodeURIComponent(barcode) +
        "&batch=" +
        encodeURIComponent(batch);


    fetch(url)

    .then(response => response.json())

    .then(result => {

        console.log("Inventory result:", result);


        if(result.status !== "success"){

            console.log("No matching inventory found");

            return;

        }


        const expirySelect =
            document.getElementById("expiry");


        // =====================
        // 加入所有 Expiry Date
        // =====================

        result.expiries.forEach(function(item, index){

            const option =
                document.createElement("option");


            option.value = item.expiry;


            // 最早的日期
            if(index === 0){

                option.textContent =
                    formatDisplayDate(item.expiry) +
                    " 🚨 EARLIEST — PLEASE USE";

            }else{

                option.textContent =
                    formatDisplayDate(item.expiry);

            }


            expirySelect.appendChild(option);

        });


        // =====================
        // 自动选择最早日期
        // =====================

        if(result.expiries.length > 0){

            expirySelect.value =
                result.expiries[0].expiry;

        }

    })

    .catch(error => {

        console.log("Expiry lookup failed:", error);

    });

}


// =====================
// CLEAR EXPIRY
// =====================

function clearExpiry(){

    const expirySelect =
        document.getElementById("expiry");


    expirySelect.innerHTML = "";


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select Expiry Date";


    expirySelect.appendChild(defaultOption);

}


// =====================
// DATE DISPLAY
// =====================

function formatDisplayDate(dateString){

    const parts =
        dateString.split("-");


    if(parts.length !== 3){

        return dateString;

    }


    return parts[2] +
        "/" +
        parts[1] +
        "/" +
        parts[0];

}


// =====================
// SUBMIT TO GOOGLE SHEET
// =====================

document.getElementById("submitBtn")
.onclick=function(){


    const data = {

        barcode:
        document.getElementById("barcode").value,

        mode:
        currentMode,

        batch:
        document.getElementById("batch").value,

        expiry:
        document.getElementById("expiry").value,

        pieces:
        document.getElementById("pieces").value,

        cartons:
        document.getElementById("cartons").value,

        qty:
        document.getElementById("qty").value,

        writer:
        document.getElementById("writer").value

    };


    // =====================
    // CHECK BARCODE
    // =====================

    if(data.barcode === ""){

        alert("Please scan barcode");

        return;

    }


    // =====================
    // CHECK BATCH
    // =====================

    if(data.batch === ""){

        alert("Please enter Batch No.");

        return;

    }


    // =====================
    // CHECK EXPIRY
    // =====================

    if(data.expiry === ""){

        alert("Please select Expiry Date");

        return;

    }


    // =====================
    // SEND TO GOOGLE SHEET
    // =====================

    fetch(scriptURL,{

        method:"POST",

        body:JSON.stringify(data)

    })


    .then(response=>response.text())


    .then(result=>{

        console.log(result);

        alert("Submitted Successfully");


        // 清空 Barcode

        document.getElementById("barcode")
            .value="";


        // 清空 Batch

        document.getElementById("batch")
            .value="";


        // 清空 Expiry

        clearExpiry();

    })


    .catch(error=>{

        console.log(error);

        alert("Submit Failed");

    });

};
