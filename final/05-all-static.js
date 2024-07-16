const express = require('express')
const path = require('path')

const app = express()

// setup static and middleware
app.use(express.static('./public'))

//can use to serve simple sites, set up middleware just dump them in one folder 

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/i ndex.html'))
//   adding to static assets(index.html-always gonna be a route ) server will serve this,it also has all the paths therefore no need to send the file
//   SSR-use template engine for this
// })

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})

//in case of express, we use it to for api or ssr

//api- seting up an http interface to interact with our data
//data is sent by server using json 
//way to get data is make an http request
//res.json - to stringify etc
//on server, we set up api that send data in json form
//frontend grabs that data by making http request
//data is in the form of array of objects -json

//ssr- sending entire template containing html,css and js
//res.render() used