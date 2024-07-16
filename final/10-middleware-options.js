const express = require('express')
const app = express()
const morgan = require('morgan')// built in middleware function, have to install
const logger = require('./logger')
const authorize = require('./authorize')
//  req => middleware => res

// app.use([logger, authorize])
// app.use(express.static('./public'))
//.use takes in middleware 
//static is a built in middleware 
app.use(morgan('tiny')) //prints to console the details of the request


// therefore before getting response to every route, we get a console log
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
  console.log(req.user)
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
