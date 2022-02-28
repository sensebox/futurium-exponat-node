const express = require('express')
const app = express()
const SerialPort = require('serialport')
let port


SerialPort.list().then(
  ports => {
    ports.forEach((port) => {
      if (port.manufacturer === 'senseBox') {
        console.log(port);
        port = new SerialPort(port.path)
        // Switches the port into "flowing mode"
        port.on('data', function (data) {
          newLine = data.toString();
          array = newLine.split(',');
          console.log(array);
        })
      }
    }
    );
  },
  err => console.error(err)
)
let newLine;
let array;

// enable CORS without external module
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  var json = JSON.stringify(array);
  res.send(json)
}
);

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port)
})