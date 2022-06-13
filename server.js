const next = require('next')
const express = require("express")
const multer  = require('multer')

const server = express();

const port = 3000
require("dotenv").config({path: __dirname + '/.env.local'})
const connectToDatabase = require('./util/mongodb')
const {createMedia} = require('./server/controller/Media')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, 'uploads/')
   },filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' +  Date.now())
    }
})

var upload = multer({ storage:storage })

app.prepare().then( async () => {
  await connectToDatabase();
  console.log("Mongodb is running")

  server.post('/upload',upload.array("media"), createMedia)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port,(err) => {
    if(err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})