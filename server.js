const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const multer = require('multer')
const cors = require("cors")
require("dotenv").config()

const app = express()
const db = require('./models')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

// var corsOptions = {
//     origin : "https://localhost:8081"
// }

// app.use(cors(corsOptions))
app.use(cors())

app.use(bodyParser.json())

app.use(multer({ storage: fileStorage, fileFilter: fileFilter}).single('image'))

mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Berhasil terkoneksi")
}).catch(err => {
    console.error("Gagal", err)
    process.exit()
})

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({message: "Halo API berjalan dengan lancar"})
})

require('./routes/AdminRoutes')(app)
require('./routes/ApiRoutes')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})