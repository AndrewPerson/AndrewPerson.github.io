//This only works with on zoom! $(window).resize(forge) doesn't work.
$(window).resize(forge);
idInput.oninput = forge;

const defaultvh = 657;
const defaultvw = 1366;
const barcWidth = 130;

function forge() {
    outputDiv.innerHTML = null;
    outputDiv.className = "";
    outputDiv.style = "";
    barcImg.src = "";
    barcImg.style.display = "none";

    if (!idInput.value) { return; }

    if (isNaN(idInput.value) || idInput.value[idInput.value.length - 1] == " ") {
        outputDiv.className = "alert alert-danger";
        outputDiv.style = "margin-bottom: -50px;";
        outputDiv.innerHTML = `"${idInput.value}" isn't a valid Student ID!`;
        return;
    } else if (idInput.value.length != 9) {
        outputDiv.className = "alert alert-danger";
        outputDiv.style = "margin-bottom: -50px;";
        outputDiv.innerHTML = `"${idInput.value}" isn't a valid Student ID!`;
        return;
    }

    let barcCanvas = document.createElement("canvas");

    bwipjs.toCanvas(barcCanvas, {
        bcid: "code128",
        text: idInput.value,
        scale: 3,
        height: 15,
        includetext: true,
        textxalign: "center"
    });
    barcImg.src = barcCanvas.toDataURL('image/png');

    if (screen.orientation.type == "landscape-primary" || screen.orientation.type == "landscape-secondary") {
        var realBarcWidth = barcWidth * Math.max(defaultvw / ($(window).height() / window.devicePixelRatio), defaultvh / ($(window).width() / window.devicePixelRatio));
    } else {
        var realBarcWidth = barcWidth * Math.max(defaultvw / ($(window).width() / window.devicePixelRatio), defaultvh / ($(window).height() / window.devicePixelRatio));
    }

    barcImg.style = `width:${realBarcWidth}px; height:auto;`;
}