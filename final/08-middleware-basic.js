const express = require('express')
const app = express()


//middleware functions execute when request is sent, has access to both request and response object 
//  req => middleware => res


//we want to log the request method,url and the time
//express passes the request and response in re and res parameters in middleware 
//when we execute a middleware we must pass the control to next middleware
const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)
  next() //until we are not sending our own response in the middleware
  //we have to pass it to next middleware, in this case is the get method logic
}

app.get('/', logger, (req, res) => {
  res.send('Home')
})
app.get('/about', logger, (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
