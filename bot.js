//Author VUYYURU RAJA SHEKAR REDDY 




// Authorized users, replace with your real IDs
var users = [
 
];

// Include required libraries
var sensorLib = require('node-dht-sensor');
var Bot = require('node-telegram-bot');

// Initialize relay board (using onoff library)
var Gpio = require('onoff').Gpio,
  light1 = new Gpio(14, 'out'),
  light2 = new Gpio(15, 'out');

// Turn both the relays off
relay1.writeSync(0);
relay2.writeSync(0); 

// Initialize DHT11 sensor
sensorLib.initialize(11, 18);

// Initialize and start Telegram BOT (insert your real token)
var Rajabot = new Bot({ token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'});

// Attach event on every received message 
Rajabot.on('message', function (message) {
 parseMessage(message);
});

// Start the bot 
  Rajabot.start();
  console.log("RAJA SEKHAR YOUR BOT IS READY! ");
  console.log("/getouts, shows the actual status of the two relays");
  console.log("/setout1 ON|OFF, /setout2 ON|OFFsets one of the outputs to ON or OFF");
  console.log("/gettemp, shows the actual temperature ");
  console.log("/gethum, shows the actual humidity");

// Function that handles a new message
function parseMessage(message) {

  if(!isAuthorized(message.from.id)) return;

  switch(true) {
  
    case message.text == "/gettemp":
        Rajabot.sendMessage({
        chat_id: message.chat.id,
        text: ' temperature: ' + sensorLib.read().temperature.toFixed(0) + '°C',
      });
      break;

    case message.text == "/gethum":
        Rajabot.sendMessage({
        chat_id: message.chat.id,
        text: 'humidity: ' + sensorLib.read().humidity.toFixed(0) + '%',
      });
      break;

    case message.text == "/getouts":
        Rajabot.sendMessage({
        chat_id: message.chat.id,
        text: 'outputs status:\nOutput 1 is ' + relay1.readSync() + '\nOutput 2 is ' + relay2.readSync(),
      });
      break;

    case /^\/setout1/.test(message.text):
      var command = message.text.replace("/setout1 ", "");
      if(command.toLowerCase() == "on") {
          light1.writeSync(1);
          Rajabot.sendMessage({
          chat_id: message.chat.id,
          text: 'Output 1 turned ON',
        });
      } else if(command.toLowerCase() == "off") {
          light1.writeSync(0);
          Rajabot.sendMessage({
          chat_id: message.chat.id,
          text: 'Output 1 turned OFF',
        });
      } else
          Rajabot.sendMessage({
          chat_id: message.chat.id,
          text: 'Unknown command: not present in our list of commands' + command,
        });    
    break;

    case /^\/setout2/.test(message.text):
      var command = message.text.replace("/setout2 ", "");
      if(command.toLowerCase() == "on") {
          light2.writeSync(1);
          Rajabot.sendMessage({
          chat_id: message.chat.id,
          text: 'Output 2 turned ON',
        });
      } else if(command.toLowerCase() == "off") {
          light2.writeSync(0);
          Rajabot.sendMessage({
          chat_id: message.chat.id,
          text: 'Output 2 turned OFF',
        });
      } else
          Rajabot.sendMessage({
          chat_id: message.chat.id,
          text: 'Unknown command: not present in our list of commands' + command,
        });
    break;
   default:
    {
          Rajabot.sendMessage({
          chat_id: message.chat.id,
          text: 'Unknown command: not present in our list of commands' + command,
          text: '/getouts, shows the actual status of the two relays',
          test: '/setout1 ON|OFF, /setout2 ON|OFFsets one of the outputs to ON or OFF',
          test: '/gettemp, shows the actual temperature',
          test: '/gethum, shows the actual humidity,
          
        });
    break;    
    }
             }
 
    
}


// Function that checks if the user is authorized (its id is in the array)
function isAuthorized(userid) {

  for(i = 0; i < users.length; i++) 
    if(users[i ] == userid) return true;
 
  return false;
}
