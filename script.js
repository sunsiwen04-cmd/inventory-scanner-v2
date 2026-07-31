*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Arial, Helvetica, sans-serif;
    background:#f3f4f6;
    color:#333;
}

.container{
    max-width:500px;
    margin:20px auto;
    background:#fff;
    border-radius:18px;
    padding:20px;
    box-shadow:0 5px 15px rgba(0,0,0,.12);
}

h1{
    text-align:center;
    margin-bottom:20px;
    font-size:28px;
}

/* Current Mode */

.mode-banner{
    background:#16a34a;
    color:#fff;
    text-align:center;
    padding:14px;
    border-radius:12px;
    font-size:18px;
    font-weight:bold;
    margin-bottom:15px;
}

/* Buttons */

.mode-buttons{
    display:flex;
    gap:10px;
    margin-bottom:25px;
}

.mode-btn{
    flex:1;
    height:50px;
    border:none;
    border-radius:12px;
    background:#e5e7eb;
    font-size:18px;
    font-weight:bold;
    cursor:pointer;
    transition:.2s;
}

.mode-btn.active{
    background:#16a34a;
    color:white;
}

/* Form */

.form-group{
    margin-bottom:18px;
}

label{
    display:block;
    font-weight:bold;
    margin-bottom:8px;
}

input,
select{
    width:100%;
    height:50px;
    border:1px solid #d1d5db;
    border-radius:12px;
    padding:0 15px;
    font-size:16px;
    background:#fff;
}

input:focus,
select:focus{
    outline:none;
    border:2px solid #16a34a;
}

/* Camera */

#reader{
    width:100%;
    height:250px;
    border:2px dashed #cbd5e1;
    border-radius:12px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#888;
    background:#fafafa;
}

/* Submit */

#submitBtn{
    width:100%;
    height:55px;
    border:none;
    border-radius:12px;
    background:#2563eb;
    color:white;
    font-size:18px;
    font-weight:bold;
    cursor:pointer;
    margin-top:10px;
}

#submitBtn:active{
    transform:scale(.98);
}

/* Mobile */

@media(max-width:600px){

    .container{
        margin:10px;
        padding:18px;
    }

    h1{
        font-size:24px;
    }

    .mode-btn{
        font-size:16px;
    }

}
