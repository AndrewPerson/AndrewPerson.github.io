var barcCanv = document.getElementById("barcCanv");
var sizeSlider = document.getElementById("size");

window.onload = init;

function init() {
    sizeSlider.min = 10;
    sizeSlider.max = 90;
    sizeSlider.value = 25;

    var img = localStorage.getItem("barcode");
    if (img) {
        console.log("Beginning image rendering...");
        var realImg = new Image;
        console.log("Assigning image data...");
        realImg.src = img;

        realImg.onload = () => {
            console.log("Drawing Image...");
            barcCanv.getContext("2d").drawImage(realImg, 0, 0, barcCanv.clientWidth, barcCanv.clientHeight);
            console.log("Image Drawn!");
        }
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

    if (isNaN(idInput.value) || idInput.value[idInput.value.length - 1] == " ") {
        warn(`"${idInput.value}" isn't a valid Student ID!`);
        return;
    } else if (idInput.value.length != 9) {
        warn(`"${idInput.value}" isn't a valid Student ID!`);
        return;
    }

    bwipjs.toCanvas(barcCanv, {
        bcid: "code128",
        text: idInput.value,
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
    localStorage.setItem("barcode", barcCanv.toDataURL());
}