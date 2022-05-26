const divCanvas = document.querySelector("#canvas");
const inputRes = document.querySelector("#resolutionPicker");
const inputColorPicker = document.querySelector("#colorPicker");
const btnClear = document.querySelector("#btnClear");
const btnEraser = document.querySelector("#btnEraser");

const Brushes = {
    color: "color",
    rgb: "rgb",
    rainbow: "rainbow"
};

let currentColor = inputColorPicker.value;
let currentBrush = "color";
let previousBrush = "color";

let resolution = parseInt(inputRes.value);

btnEraser.addEventListener("click", (e) => {
    if (currentBrush != "eraser") {
        previousBrush = currentBrush;
        currentBrush = "eraser";
        btnEraser.style.backgroundColor = "#203647";
        currentColor = "white";
        return;
    }
    if (currentBrush === "eraser") {
        currentBrush = previousBrush;
        btnEraser.style.backgroundColor = "#007CC7";
        currentColor = inputColorPicker.value;
    } 

})

btnClear.addEventListener("click", (e) => {
    clearCanvas();
});

inputColorPicker.addEventListener("change", (e) => {
    currentColor = e.target.value;
});

inputRes.addEventListener('change', updateCanvasSize);

function changeBrush(brush) {
    previousBrush = currentBrush;
    currentBrush = brush;
}

function updateCanvasSize(e) {
    deleteCanvas();
    createCanvas(parseInt(e.srcElement.value))
}

function clearCanvas() {
    divCanvas.childNodes.forEach(element => {
        element.style.backgroundColor = "white";
        currentBrush = "color";
        currentColor = inputColorPicker.value;
        btnEraser.style.backgroundColor = "#007CC7";
    });
}

function deleteCanvas() {
    divCanvas.replaceChildren()
}

function createCanvas(size) {
    deleteCanvas() // removes text element in the canvas
    let repeat = "repeat(" + size + ", 1fr)";
    divCanvas.style.gridTemplateColumns = repeat;
    divCanvas.style.gridTemplateRows = repeat;
    for (let i = 0; i < size**2; i++) {
        let pixel = document.createElement("div");
        pixel.className = "pixel"
        pixel.addEventListener("mouseenter", (e) => {e.target.style.backgroundColor = currentColor;})
        divCanvas.appendChild(pixel);        
    }
    
}

createCanvas(resolution);