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

function cameraTakePicture() {
   
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 90,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        let canvas = document.querySelector("#cv");
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.src = "data: image / jpeg; base64," + imageData;
        img.onload = function () { 
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.font = "bold 22px sans-serif";
            cxt1.fillStyle = "white";
            ctx.fillText("ARRIBA ESPAÑA", 50, 50);
         };
    }

    function onFail(message) {
        alert('Failed because: ' + message);
       
    }
}