var promo = document.getElementById("promo"),
    scratchOffCanvas = promo.getContext('2d'),
    brushRadius = (promo.width / 100) * 5,
    img = new Image();

if (brushRadius < 50) {
    brushRadius = 50
}


img.onload = function () {
    scratchOffCanvas.drawImage(img, 0, 0, promo.width, promo.height);
}
img.loc = 'https://gpaimagehosting.s3.us-east-2.amazonaws.com/BlackFriday/Inverse+Images/'; // Image on top of Scratch off

img.filename = 'Sand_Scratchoff_Bkgrd2.png';
if (window.devicePixelRatio >= 2) {
    var nameParts = img.filename.split('.');
    img.src = img.loc + nameParts[0] + "-2x" + "." + nameParts[1];
} else {
    img.src = img.loc + img.filename;
}

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
    var scratchoffBlock = promo.getBoundingClientRect();
    return {
        x: Math.floor((xRef - scratchoffBlock.left) / (scratchoffBlock.right - scratchoffBlock.left) * promo.width),
        y: Math.floor((yRef - scratchoffBlock.top) / (scratchoffBlock.bottom - scratchoffBlock.top) * promo.height)
    };
}

function drawDot(mouseX, mouseY) {
    scratchOffCanvas.beginPath();
    scratchOffCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
    scratchOffCanvas.fillStyle = '#000';
    scratchOffCanvas.globalCompositeOperation = "destination-out";
    scratchOffCanvas.fill();
}

promo.addEventListener("mousemove", function (e) {
    var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

promo.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
        var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);