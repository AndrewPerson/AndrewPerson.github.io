window.onload = init;

function init() {
    var sizeSlider = document.getElementById("size")
    sizeSlider.min = window.innerWidth / 10;
    sizeSlider.max = window.innerWidth / 1.5;
    sizeSlider.value = window.innerWidth / 4;
}

$(window).resize(forge);
document.getElementById("container").oninput = forge;
window.addEventListener("deviceorientation", forge);

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
        warn(`"${idInput.value}" isn't a valid Student ID!`);
        return;
    } else if (idInput.value.length != 9) {
        warn(`"${idInput.value}" isn't a valid Student ID!`);
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

    barcImg.style = `width:${document.getElementById("size").value}px; height:auto;`;
}

function warn(warning) {
    outputDiv.className = "alert alert-danger";
    outputDiv.style = "margin-bottom: -6px;";
    outputDiv.innerHTML = warning;
}