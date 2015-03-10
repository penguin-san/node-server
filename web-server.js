
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var fs = require('fs')

app.use(bodyParser());
app.get('/', function (req, res) {
  res.sendfile('write.html')
})

app.post('/code', function (req, res) {
	console.log("called ")
	console.log(req.body["code"])
	fs.writeFile('./src/ai.js', req.body["code"], function(err) {
		if(err) {
			console.log(err)
		} else {
			console.log("the file was saved")
		}
		res.sendfile("read.html")
	})
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
})
