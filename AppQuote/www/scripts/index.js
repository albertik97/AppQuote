var img;
function prepararCanvas() {
    let canvas = document.querySelector("#cv");
    let ctx = canvas.getContext('2d');


    /*
    var img = new Image();
    img.src = './images/cam.png';
    img.onload = function () {
        ctx.drawImage(img, canvas.width-40, 10, 30, 30);
    };

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height-60, 25, 0, (Math.PI / 180) * 360, true);
    var grd = ctx.createRadialGradient(12,12, 10,12, 12, 15);
    grd.addColorStop(0, "blue");
    grd.addColorStop(1, "white")
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;

    ctx.fillStyle = grd;
    ctx.stroke();
    ctx.fill();*/


}

function alertDismissed() {
    // do something
}

function cameraTakePicture() {
   
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URI,
        cameraDirection: 1
    });

    function onSuccess(imageData) {
        let canvas = document.querySelector("#cv");
        let ctx = canvas.getContext('2d');
        img = new Image();
        img.src = imageData;
        img.onload = function () { 
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.font = "bold 40px sans-serif";
            var gradient= ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "red");
            gradient.addColorStop("0.5", "yellow");
            gradient.addColorStop("1.0", "red");
            ctx.fillStyle = gradient;
            ctx.textAlign = "center";
            //let text = loadText();
            ctx.fillText(loadText(), canvas.width / 2, canvas.height * 0.9);
          
         };
    }

    function onFail(message) {
        alert('Failed because: ' + message);
       
    }
}


//esta está por hacer y tal, se lee el json y devuelve una frase aleatoria
function loadText() {
    var frase = "";

    $.getJSON("frases.json", function (data) {
        var obj = JSON.parse(data);
        var obj_str = JSON.stringify(obj, null, 2);

        document.write(obj_str);

        // ...
    });

    return "Arriba España";

}

function save() {
    navigator.notification.alert(
        'Ruta: ',  // message
        alertDismissed,         // callback
        'Guardada',            // title
        'Aceptar'                  // buttonName
    );
           // navigator.camera.cleanup(); //limpia archivos de la camara
}