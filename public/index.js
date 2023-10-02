const upload = document.getElementById("upload");

const waveformCanvas = document.getElementById('waveformCanvas');
const context = waveformCanvas.getContext('2d');

var leftWVF = [];
var rightWVF = [];

const leftColor = document.getElementById("leftColorPicker");
const rightColor = document.getElementById("rightColorPicker");
const leftOpacity = document.getElementById("leftOpacitySlider");
const rightOpacity = document.getElementById("rightOpacitySlider");

leftColor.addEventListener("input", drawWaveform);
rightColor.addEventListener("input", drawWaveform);
leftOpacity.addEventListener("input", drawWaveform);
rightOpacity.addEventListener("input", drawWaveform);

function getRGB(colorPicker) {
    // Get the selected color in hexadecimal format (e.g., "#RRGGBB")
    var hex = colorPicker.value;

    // Remove the '#' character, if present
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal values for red, green, and blue components
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Return the RGB color in the "rgb(r, g, b)" format
    return [r,g,b];
}

// Function to draw the audio waveform
function drawWaveform() {
    const width = waveformCanvas.width;
    const height = waveformCanvas.height;

    context.clearRect(0, 0, width, height);
    let rgb = getRGB(leftColor);
    let a = leftOpacity.value;
    context.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
    context.lineWidth = 2;

    context.beginPath();

    const sliceWidth = width / leftWVF.length;

    // begin left samples
    let x = 0;
    for (let i = 0; i < leftWVF.length; i++) {
        const y = (((leftWVF[i] / 32768.0) * (height/2)) + (height/2));
        if (i === 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
        x += sliceWidth;
    }

    context.stroke();
    rgb = getRGB(rightColor);
    a = rightOpacity.value;
    context.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

    // begin right samples
    x = 0;
    context.beginPath();
    for (let i = 0; i < rightWVF.length; i++) {
        const y = (((rightWVF[i] / 32768.0) * (height)) + (height/2));
        if (i === 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
        x += sliceWidth;
    }

    context.stroke();
}

// listen for an upload action
upload.onclick = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();
    console.log("upload has been clicked, no actions performed yet");
  
    const file = document.getElementById("file").files[0];
    console.log(file);
    if (file) {
        const formData = new FormData();
        formData.append('file', file); // Append the file to the FormData object

        // Make a POST request to your server to handle the file upload
        console.log("File upload has been acknowledged");
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then( response => { if(response.ok) {
            console.log("response is okay");
            return response.json(); }
        })
        .then( json => {
            console.log("json is being routed");
            console.log(json);
            leftWVF = json.left_samples; 
            rightWVF = json.right_samples;
            drawWaveform();
            // dashboard.style.display = defaultDisplay;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    // visualize waveform on client side
};