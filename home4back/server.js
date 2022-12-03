const express = require('express')

const port = 3000 //process.env.PORT || 3000
const app = express()

// TODO: get port from config
app.listen(port, () => {
    console.log(`Server is listening on port ${ port }.`)
})

// TODO: configure routes for our social media app

/* Social media app routes start */

// TODO: Homepage route, Look up requirements from assignemnt
app.get('/', (req, res) => {
    console.log("Request for route '/' has been received")
})

// TODO: login

// TODO: signup

// TODO: isAuth

// TODO: logout


/* Social media app routes end */