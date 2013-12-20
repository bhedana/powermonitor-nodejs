var http = require('http');
var express = require('express');
var app = express();

var rsp = require("serialport");
var xbee = require("xbee");
var SerialPort = rsp.SerialPort; // localize object constructor

if (process.platform == 'darwin') {
  portName = '/dev/cu.usbserial-FTFO9K4V';
} else {
  portName = '/dev/ttyUSB0';
}

var serialport = new SerialPort(portName, { 
  parser: xbee.packetParser()
});

var TweetawattSensor = require("tweetawatt").TweetawattSensor;

var sensors = [];
function sensor_ids(){
  ids = []
  for(i=0; i<sensors.length; i++){
    if(sensors[i]){
      ids.push(sensors[i].address_16)
    }
  }
  return ids;
}
serialport.on("data", function(data) {
  var sensor = new TweetawattSensor(data);
  
  sensors[sensor.address] = sensor
  // console.log(sensor_ids())
});
















var inputs = [
  { pin: '11', gpio: '17', value: 1 },
  { pin: '12', gpio: '18', value: 0 }
];

app.configure( function() {
  app.use(express.favicon());
  app.use(express['static'](__dirname ));
});

// Express route for incoming requests for a customer name
app.get('/inputs', function(req, res){
  res.send(sensor_ids());
});
// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res){
  res.send(sensors[req.params.id]);
});

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res){
  res.send('Unrecognised API call', 404);
});

// Express route to handle errors
app.use(function(err, req, res, next){
  if (req.xhr) {
    res.send(500, 'Oops, Something went wrong!');
  } else {
    next(err);
  }
});

app.listen(3000);
console.log('App Server running at port 3000');