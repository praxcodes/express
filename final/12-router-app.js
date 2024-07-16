//using router we can group routes together- functionality can be set up as separate controllers
const express = require('express')
const app = express()

const people = require('./routes/people') //we want to use the people router which we have set up in people.js
const auth = require('./routes/auth')

// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/api/people', people) //set up base route for this router, the file where u have exported the router needs to change, remove base route from there 
app.use('/login', auth)//this the middleware that is setting up routes 

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
