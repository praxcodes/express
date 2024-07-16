const express = require('express')
const app = express()
const logger = require('./logger') //make a separate file logger.js to put the logger function there and export it
const authorize = require('./authorize')
//  req => middleware => res
app.use([logger, authorize]) //app.use invokes logger and authorize for every route
// api/home/about/products

//app.use(logger)

//applying middleware to specific routes 
//first argument is path
//app.use('/api',logger) //now logger is applied to all the paths which come after /api (in this file) in this case products and items
app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
app.get('/api/items', (req, res) => {
  console.log(req.user) //prints the user after adding on to req object if query had user parameter 
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

/*
const authorize =(req,res,next)=>{
  const {user} =req.query
  if(user==='john'){
    req.user={name:'john',id:3} //addding property to req object for future if url has query of john
    next() //goes on to execute the get method 
    //this example is relevant as normally we add a user once authorised 
  }
  else{
    res.status(401).send('unauthorised') //it doesnt execute any method and shows unauthorsied if no query in url also
  }
}

//normally check for jwt, and if token exist then we communicate with db to get the user 
  */