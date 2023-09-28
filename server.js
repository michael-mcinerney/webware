const fs = require('fs');
const url = require('url');
const multer = require('multer');
const path = require('path');
const lame = require('node-lame').Lame;

// Configure Multer to specify where to store uploaded files
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

const express    = require('express'),
      app        = express(),
      audio      = [];

app.use( express.static( 'public' ) );
app.use( express.static( 'views'  ) );
app.use( express.json() );

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // The uploaded file is available as req.file
  const uploadedFile = req.file;
  const filename = uploadedFile.originalname;
  const mimetype = uploadedFile.mimetype;
  const fileBuffer = uploadedFile.buffer; // Access the file data as a Buffer

  // You can process the file data here
  // For example, you can send it as a response or save it to a database
   
  // Create a Lame decoder instance
  const decoder = new lame({
    output: 'buffer',
  }).setBuffer(fileBuffer);

  decoder.decode()
    .then(() => {
      // Decoding finished
      const buffer = decoder.getBuffer();
      console.log(buffer);
    })
    .catch((error) => {
      // Something went wrong
      console.log(error);
    });
    
  res.send(`File uploaded: ${filename}, MIME type: ${mimetype}`);
});

app.listen( process.env.PORT )

