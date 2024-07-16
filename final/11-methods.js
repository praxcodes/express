const express = require('express')
const app = express()
let { people } = require('./data')

//postman- tool for testing data sent by APIs ,dont need frontend to test out api
//axios to make http requests,cleaner api and better error messages

//browser cannot perform post request by itself
//post request - body is crucial

// static assets- to get the interface of two html files along with js and css
//html file contain 2 forms, name field changes on the basis of the value you enter
//middleware lets the interface appear when we send a request any route
//to go to traditional form, /index.html to the route

app.use(express.static('./methods-public'))

//adding middleware to gte access to form data
// parse form data and add values to req.body
app.use(express.urlencoded({ extended: false })) //use query-string library to parse data to url
// parse json
app.use(express.json()) //for incoming json data sent using axios.post, adds to req


//on submit the form goes to /login- action field in form tag
//header is url encoded 
app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please Provide Credentials') //empty name field
})

//middleware executes first in all these requests 
//the frontedn displays a list of all the people from json file
app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

//enter the json data in postman for post request in body
app.post('/api/people', (req, res) => {
  const { name } = req.body //due to middleware
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })//we provide the data and it is displayed as a form alert by frontend logic
  }
  res.status(201).json({ success: true, person: name }) //you send the data from frontend to server and the data is sent again to frontend by server on successfully recieving it and is handled by the frontend logic- added to a list in this case
//when we perform request with axios, we get back a giant object, we are interested in the data property of that object 
})

app.post('/api/people/postman', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, data: [...people, name] })
})//add new person we created to array and display the whole new array




//we go with route parameter
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params   //we add id in url
  const { name } = req.body   //in body, we add the value to which it should change

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person  //and for the ids other than the one in ul it just returns unchanged object as a part of array
  })
  res.status(200).json({ success: true, data: newPeople }) //returns whole array of people with midified values of name
})

app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

//sending a request using javascript, the content type is different 
//and the form doesnt have method and action attributes
//http request made using axios in script tag in javascript.html, separate js file can also be sued  
