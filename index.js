const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const defaultvw = 1366;
const barcWidth = 136;

function forge() {
    outputDiv.innerHTML = null;
    outputDiv.className = "";
    outputDiv.style = "";
    barcImg.src = "";
    barcImg.style.display = "none";

    if (!idInput.value) { return; }

    if (isNaN(idInput.value) || idInput.value[idInput.value.length-1] == " ") {
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

    var realBarcWidth = barcWidth * (defaultvw / vw);

    barcImg.style = `width:${realBarcWidth}px; height:auto;`;
}

idInput.oninput = forge;