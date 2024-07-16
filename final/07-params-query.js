const express = require('express')
const app = express()
const { products } = require('./data')

app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>')
})
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product //de structuring
    return { id, name, image } //u dont have to display all the data all the time
  })

  res.json(newProducts)
})

//we have route parameters in express
app.get('/api/products/:productID', (req, res) => {
  // console.log(req)
  // console.log(req.params)
  const { productID } = req.params  //the route parameter in url, is stored in req object as a string , req.params gives out a string whereas its a number in the array

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  )
  if (!singleProduct) {
    return res.status(404).send('Product Does Not Exist')
  }
  //console.log(singleProduct) --undefined
  return res.json(singleProduct)
})


//complicated route parameters 

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params) //prints both productID and reviewID as strings
  res.send('hello world')
})


//url is till ? and ater that is the info about data requested we send to the server -query
//the server sets up the query string parameters(key value pairs)
//api documentation

app.get('/api/v1/query', (req, res) => {
  // console.log(req.query) - gives query parameters after the ? sign separated by & in api url as key value pairs, stringified
  const { search, limit } = req.query
  let sortedProducts = [...products] //make new instance of products array as we will modify the values a bit

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search)  //return because we cannot send two responses to one request
    }) 
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit)) //get limit no fo items from the array
  }
  if (sortedProducts.length < 1) {
    //if the query parameters dont match a legit value, it returns this json response(object) which has an empty array
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ sucess: true, data: [] })
  }

  //if no query parameters , all the data, the whole array is sent
  res.status(200).json(sortedProducts)// we modify and return the already existing array and not return a new variable with the response 
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})


//till now we've seen .send -to send string,html etc 
//.sendfile -to send file along with .use
//all static -for html,js and css
//.json- for json arrays (data)- api
//ssr?