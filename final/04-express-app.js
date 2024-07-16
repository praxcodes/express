const express = require('express')//have to install
const path = require('path') //pre-installed with node 

const app = express()

// setup static and middleware
app.use(express.static('./public'))//make a folder-public in parent dir the dir in which final and navbar app are
//put the styles,js and logo file in it
//static assets-the server doesnt need to change it
//eg. js,image and ccs file-js is dynamic for browser and static for browser
//we can send back dynamic files also i.e depending on what the user is trying to do and who the user is the content sent changes 


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})
