function prepararCanvas() {
    let canvas = document.querySelectorAll("canvas");
    let ctx = canvas[0].getContext('2d');

    ctx.arc(360, 70, 50, 0, (Math.PI / 180) * 360, true);
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 10;
    ctx.stroke();

    }