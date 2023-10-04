# 2D Audio Visualizer Documentation
Welcome to the 2D Audio Visualizer documentation. This page provides a detailed overview of the project structure, file contents, and the high-level design of the application.

To acccess the project, please navigate to http://mamcinerney.com. Note that SSL is not yet supported, and the domain seems to be blocked on campus WiFi, so you will need to access it either through a VPN or off-campus and it is important that you type "http://" beforehand to avoid encountering an SSL_PROTOCOL_ERROR.
## Directory Structure
```java
.
├── public/
│   ├── index.js
│   ├── style.css
├── views/
│   ├── index.html
├── package.json
├── server.js
```

## Files
### 1. public/index.js
The index.js file contains the client-side JavaScript code responsible for the functionality of the 2D audio visualizer. Here's a breakdown of its key components:

**UI Interaction:**

- Event listeners are implemented for various UI elements, such as color pickers, opacity sliders, playback controls, and zoom buttons.
- Users can control audio playback, navigate through the audio track, and adjust the visualizer settings.

**Server Communication:**

- Functions like goBack, goAhead, zoomIn, and zoomOut make POST requests to the server to fetch updated audio samples based on user interactions.

**Audio Playback:**

- The audioPlayback function uses the Web Audio API to play the audio based on the selected samples.

**Canvas Drawing:**

- The drawWaveform function is responsible for rendering the audio waveform on the HTML canvas, taking into account user-selected colors and opacities.

**File Upload:**

- The upload button triggers a file upload action, and the selected audio file is sent to the server for processing.


### 2. public/style.css
- The style.css file defines the styles for the 2D audio visualizer, with a specific focus on the positioning and appearance of the canvas element. Notably, it centers the canvas horizontally and sets its height and border.


### 3. views/index.html
- The index.html file provides the structure for the visualizer's user interface. Key elements include:

**File Upload Form:**

- Users can select an audio file to upload, and the form triggers the server-side upload handling.

**Playback Controls:**

- Buttons for uploading, playing audio, navigating backward and forward, and zooming in and out.

**Dashboard Section:**

- UI elements for configuring left and right waveform colors and opacities.

**Waveform Canvas:**

- The canvas element where the audio waveform is visually represented.


### 4. package.json
The package.json file describes the project's metadata and dependencies. Key configurations include:

**Dependencies:**

- Express, Multer, Node-lame are utilized for server-side functionality.

**Scripts:**

- The start script is defined to run the server using node server.js.


### 5. server.js
The server.js file contains the server-side logic for handling various aspects of the audio visualizer. Notable components include:

**File Upload Handling:**

- Multer is configured to store uploaded files in memory, and the uploaded audio file is processed for decoding and waveform generation.

**Audio Processing Endpoints:**

- Server-side endpoints (/fast-forward, /backtrack, /zoom-in, /zoom-out) handle requests for fetching specific segments of the audio waveform based on user interactions.

**Session Management:**

- Express-session is used for managing user sessions, including storing uploaded audio file data and playback position.

**Audio Decoding:**

- Node-lame is employed to decode the uploaded audio file, and the resulting buffer is stored for waveform generation.

**Server Initialization:**

- The server is set up to listen on port 3001.

## High-Level Design
The 2D audio visualizer employs a client-server architecture. The client-side (implemented in public/index.js and public/style.css) is responsible for user interaction, audio playback, and waveform visualization. The server-side (implemented in server.js) handles file uploads, audio processing, and responds to user interaction requests.

### Key Technical Achievements:

**Audio Decoding:**

- Node-lame is used for efficient decoding of audio files, allowing for smooth audio playback and waveform generation.

**Real-time Interaction:**

- Server endpoints enable real-time interaction with the audio track, allowing users to navigate, zoom, and adjust settings dynamically.

**Session Management:**

- Express-session is utilized to manage user sessions, ensuring a seamless experience and maintaining state across interactions.

**Canvas Drawing:**

The HTML canvas is employed for rendering the audio waveform, providing an intuitive and visually appealing representation of the audio data.

**WebAudio API:**

- WebAudio is used on the client side, using the array with amplitude values for the waveform passed to the client to enable the actual playback of fetched audio.