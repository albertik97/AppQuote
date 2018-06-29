var img;
var jsonAll;
var data;

function prepararCanvas() {
    let canvas = document.querySelector("#cv");
    let ctx = canvas.getContext('2d');

    $.getJSON("data.json", function (data) {
        jsonAll = data;
        // ... Cargar el fichero json 1 sola vez
    });
}

function alertDismissed() {
    // do something
}

function cameraTakePicture() {
    

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        destinationType: Camera.DestinationType.FILE_URI,
        cameraDirection: 1
    });

    function onSuccess(imageData) {
        let canvas = document.querySelector("#cv");
        let ctx = canvas.getContext('2d');
        data = imageData;
        img = new Image();
        img.src = imageData;
        img.onload = function () { 
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.font = "bold 20px sans-serif";
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

    var n = Object.keys(jsonAll['frases']).length;

    var indice = Math.floor(Math.random() * n);

    return jsonAll['frases'][indice]['text'];

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

function sendwa() {
    let canvas = document.querySelector("#cv");
    data = canvas.toDataURL("image/png");
    window.plugins.socialsharing.shareViaWhatsApp('Compartido via AppQuote', data, null /* url */,
        function () {
            console.log('share ok')
        },
        function (errormsg) {
            alert(errormsg)
        });
}