const express = require('express')
const app = express() //setting up express or invoking it

app.get('/', (req, res) => {  //listening for get request on our route
  console.log('user hit the resource')
  res.status(200).send('Home Page')
})// callback invoked everytime user performs get request on this route

app.get('/about', (req, res) => {
  res.status(200).send('About Page')//express sends the status code by itself but u can also send it yourself
})//request sucessful

app.all('*', (req, res) => { //response when a resource is not found
  res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000...')
}) //when we instantiate that server or when it starts listening like by running npm start, callback will run

//http methods in req object- represents what user is trying to do
//by default all browser perform get requests
// app.get
// app.post
// app.put
// app.delete
// app.all      
// app.use  -middleware
// app.listen
