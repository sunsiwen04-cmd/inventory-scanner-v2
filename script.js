const scriptURL = "https://script.google.com/macros/s/AKfycbwXL948q6a3fBEDv_2XgNsYFRmB317QCKsnor6zLGhQDHbd3glIuACEBPwlaBgga6B_/exec";


function sendToSheet(code) {

  const data = {
    code: code,
    type: document.getElementById("type").value,
    user: document.getElementById("user").value
  };


  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })

  .then(response => response.json())

  .then(result => {

    console.log(result);

    document.getElementById("result").innerHTML =
    "Success: " + code;

  })

  .catch(error => {

    console.log(error);

    document.getElementById("result").innerHTML =
    "Failed";

  });

}



function onScanSuccess(decodedText) {

  console.log("Scan:", decodedText);

  sendToSheet(decodedText);

}



function onScanFailure(error) {

  // 不显示扫描错误

}
