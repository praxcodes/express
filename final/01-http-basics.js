const http = require('http')
//built-in node so dont need to install


//method takes a callback which is invoked everytime user hits the server at port 5000 from browser
//parameters are the request and response object
//req contains info about http request 
//we need to send back info to browser
const server = http.createServer((req, res) => {
  // console.log(req.method) //method of request like get, post
  const url = req.url
  // home page
  if (url === '/') {
    //has status code and headers of res- object containing content type,also called mime type-tells nature of a doc
    res.writeHead(200, { 'content-type': 'text/html' }) //to send more info/meta data about response to browser so that it can render res well
    res.write('<h1>home page</h1>') //better approach to display html  also body of res
    res.end()//must be called on each response
    //can be passed a string or the html that we want to display
    //method signals to the server that all the response headers and body have been sent 
  }
  // about page- the resource we want
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>about page</h1>')
    res.end()
  }
  // 404
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h1>page not found</h1>')
    res.end()
  }
})

server.listen(5000)
//we have to make the server listen at a port 5000
//port- communication endpoint, 80-http