// Dependencies
// =============================================================
var express = require("express")
var app = express()
var path = require("path")
var nodemailer = require("nodemailer")



// Ports
//=============================================================
var PORT = process.env.PORT || 8080

//Middleware
app.use(express.static('public'))
app.use(express.json())

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))

// Routes
// =============================================================

// Basic route that sends the user first to the  Page
app.get("/", function (req, res) {
    // res.send("this is real home") //this is to test path
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/projects", function (req, res) {
    // res.send("this is Home")
    res.sendFile(path.join(__dirname, "/public/projects.html"))
})

app.get("/services", function (req, res) {
    // res.send("this is service")
    res.sendFile(path.join(__dirname, "/public/services.html"))
})

app.get("/gallery", function (req, res) {
    // res.send("this is the image page")
    res.sendFile(path.join(__dirname, "/public/gallery.html"))
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT : " + PORT)
})

// Services page contact form email set up
// =============================================================
app.post('/services', (req, res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chris.tr88@gmail.com',
            pass: ''
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'chris.tr88@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send('error')
        } else {
            console.log('Email sent: ' + info.response)
            res.send('success')
        }
    })
})

