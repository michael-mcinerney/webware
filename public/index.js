const upload = document.getElementById("upload");

const waveformCanvas = document.getElementById('waveformCanvas');
const context = waveformCanvas.getContext('2d');

// Function to draw the audio waveform
function drawWaveform(data) {
    const width = waveformCanvas.width;
    const height = waveformCanvas.height;

    context.clearRect(0, 0, width, height);
    context.strokeStyle = 'blue';
    context.lineWidth = 2;

    context.beginPath();

    const sliceWidth = width / data.length;

    let x = 0;
    for (let i = 0; i < data.length; i++) {
        const y = (((data[i] / 32768.0) * height) - (height/2));
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
            drawWaveform(json.left_samples);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    // visualize waveform on client side
};