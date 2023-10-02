const fs = require('fs');
const url = require('url');
const multer = require('multer');
const path = require('path');
const lame = require('node-lame').Lame;

// Configure Multer to specify where to store uploaded files
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

var buff = null;

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
      buff = decoder.getBuffer();
      console.log(buff);

      var leftSamples = [];
      var rightSamples = [];

      var offset = 44;
      while(buff[offset]==0 && buff[offset+1]==0 && buff[offset+2]==0 && buff[offset+3]==0) {
        offset+=4;
      } for(var i = 0; i < 22050; i++) {
        // interpret pulse modulation
        var left1 = buff[offset+(i*4)+0];
        var left2 = buff[offset+(i*4)+1];
        var right1 = buff[offset+(i*4)+2];
        var right2 = buff[offset+(i*4)+3];

        var left = left1+(left2*256);
        var right = right1+(right2*256);

        // convert unsigned bit values to 16 bit signed
        if(left&0x8000) {
          left=-((~left&0x7fff)+1);
        } if(right&0x8000) {
          right=-((~right&0x7fff)+1);
        } leftSamples.push(left);
        rightSamples.push(right);
      } const responseObj = {
        left_samples: leftSamples,
        right_samples: rightSamples
      }; res.status(200).json(responseObj); return;

      // graph elements from server
    })
    .catch((error) => {
      // Something went wrong
      console.log(error);
    });
    
  // res.send(`File uploaded: ${filename}, MIME type: ${mimetype}`);

});

app.listen( 3001 )

