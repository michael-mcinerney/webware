const multer = require('multer');
const lame = require('node-lame').Lame;

const express = require('express');
const app = express();

// Configure Multer to specify where to store uploaded files
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const uploadedFile = req.file;
    const fileBuffer = uploadedFile.buffer;

    const decoder = new lame({
      output: 'buffer',
    }).setBuffer(fileBuffer);

    await decoder.decode();

    const buff = decoder.getBuffer();
    const leftSamples = [];
    const rightSamples = [];

    const offset = 44;
    const range = 220500;

    for (let i = 0; i < range; i++) {
      const left = buff[offset + i * 4] + (buff[offset + i * 4 + 1] << 8);
      const right = buff[offset + i * 4 + 2] + (buff[offset + i * 4 + 3] << 8);

      // convert unsigned bit values to 16 bit signed
      if (left & 0x8000) {
        left = -((~left & 0x7fff) + 1);
      }
      if (right & 0x8000) {
        right = -((~right & 0x7fff) + 1);
      }

      leftSamples.push(left);
      rightSamples.push(right);
    }

    const responseObj = {
      left_samples: leftSamples,
      right_samples: rightSamples
    };
    
    res.status(200).json(responseObj);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3001);