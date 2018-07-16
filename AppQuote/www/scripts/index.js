var img;
var jsonAll;
var data;
var _width_;
var _height_;

function prepararCanvas() {
    let canvas = document.querySelector("#cv");
    _width_ = window.innerWidth;
    _height_ = window.innerHeight;
    canvas.width = 320;
    canvas.height = 420;
    let ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5);
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
            ctx.font = "bold 20px Comic Sans MS";

            ctx.fillStyle = "white";
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
    window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            console.log(msg);
            var message = "Imagen guardada correctamente";
            $(document).ready(function () {
                $("#popupLogin").popup("open");
            });
            //$("#lnkDialog").click();
        },
        function(err){
            console.log(err);
        },
        document.getElementById('cv')
    );
}

function sendwa() {
    let canvas = document.querySelector("#cv");
    data = canvas.toDataURL("image/png");
    window.plugins.socialsharing.shareViaWhatsApp('Compartido via AppQuote', data, null /* url */,
        function () {
            console.log('share ok');
        },
        function (errormsg) {
            alert(errormsg);
        });
}

function toInsta() {
    let canvas = document.querySelector("#cv");
    Instagram.isInstalled(function (err, installed) {
        if (installed) {
            Instagram.share(canvas.toDataURL("image/png"), function (err) {
                if (err) {
                    console.log("not shared");
                } else {
                    console.log("shared");
                }
            });
        } else {
            console.log("Instagram is not installed");
        }
    });
}

function pop_up() {

}