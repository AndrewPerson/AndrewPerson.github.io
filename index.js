var barcCanv = document.getElementById("barcCanv");
var sizeSlider = document.getElementById("size");

window.onload = init;

function init() {
    sizeSlider.min = 10;
    sizeSlider.max = 90;
    sizeSlider.value = 25;

    var id = localStorage.getItem("barcode");
    if (id) {
        barcCanv.style = `width:${document.getElementById("size").value}%; height:auto;`;
        renderBarcode(id);
    }
}

$(window).resize(forge);
document.getElementById("container").oninput = forge;

const defaultvh = 657;
const defaultvw = 1366;
const barcWidth = 130;

function forge() {
    outputDiv.innerHTML = null;
    outputDiv.className = "";
    outputDiv.style = "";

    barcCanv.style = `width:${document.getElementById("size").value}%; height:auto;`;

    if (!idInput.value) { return; }

    if (!isValidID(idInput.value)) {
        warn(`"${idInput.value}" isn't a valid Student ID!`);
        return;
    }

    renderBarcode(idInput.value);
}

function isValidID(id) {
    if (!id) { return false; }

    if (isNaN(id) || id[id.length - 1] == " ") { return false; }
    else if (id.length != 9) { return false; }

    return true;
}

function renderBarcode(id) {
    bwipjs.toCanvas(barcCanv, {
        bcid: "code128",
        text: id,
        scale: 12,
        height: 15,
        includetext: true,
        textxalign: "center"
    });
}

function warn(warning) {
    outputDiv.className = "alert alert-danger";
    outputDiv.style = "margin-bottom: -6px;";
    outputDiv.innerHTML = warning;
}

document.getElementById("save").onclick = () => {
    if (isValidID(idInput.value)) { localStorage.setItem("barcode", idInput.value); }
}