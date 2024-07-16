const express = require('express')
const app = express()
const { products } = require('./data')
app.get('/', (req, res) => {
  res.json(products) //sends json response i.e converts into json string using json.stringify()
  //can add status code 
  //when we go to localhost:5000 ,we get an array of objects that is products 
  //here we have data locally, it can be on a database also
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
