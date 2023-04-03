const fs = require('fs')
const express = require('express')

const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client_clouds/')
    },
    filename: function (req, file, cb) {
      cb(null, 'upload')
    }
  })


const upload = multer({ storage: storage });

var app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(express.json ( { limit: '1mb'}))
var cors = require('cors')
var corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors())


// app.get('../client/index.html')
app.get('/', (req,res) =>
{
    res.send('Hello')
})

// Serve cloud endpoints
app.use('/clouds', express.static('client_clouds/'))

// const 

app.post("/upload",upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    // console.log('got POST')
    // console.log(req)
    // console.log(req.body);
    // console.log(req.files);
     res.json({ message: "Successfully uploaded files" });
}

app.get('/api', (req,res) =>
{
    var fileList: Array<string> = new Array<string>;
    console.log('Got GET!')
    fs.readdirSync('../client/public/model').forEach(file => {
        fileList.push(file)
    }); 

    console.log(fileList)
    res.json(fileList)
    // res.send(JSON.stringify(data))
    // console.log(res) 
    // res.send('Hello!')
})

var server = app.listen(5174, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Upload server listening at http://%s:%s", host, port)
 })