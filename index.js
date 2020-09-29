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

    if (screen.orientation.type == "landscape-primary" || screen.orientation.type == "landscape-secondary") {
        if (navigator.userAgent.match("/Android/i")
            || navigator.userAgent.match("/webOS/i")
            || navigator.userAgent.match("/iPhone/i")
            || navigator.userAgent.match("/iPad/i")
            || navigator.userAgent.match("/iPod/i")
            || navigator.userAgent.match("/BlackBerry/i")
            || navigator.userAgent.match("/Windows Phone/i")) {

            //This is a temporary solution.
            warn("Hold your device in portrait orientation!");
            return;
        }
    } else {
        var realBarcWidth = barcWidth * Math.max(defaultvw / ($(window).width() / window.devicePixelRatio), defaultvh / ($(window).height() / window.devicePixelRatio));
    }

    barcImg.style = `width:${realBarcWidth}px; height:auto;`;
}

function warn(warning) {
    outputDiv.className = "alert alert-danger";
    outputDiv.style = "margin-bottom: -50px;";
    outputDiv.innerHTML = warning;
}