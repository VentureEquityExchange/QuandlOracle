import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import Promise from 'bluebird';
let exec = require('child_process').exec,
let ethpass = path.normalize(__dirname+'/.ethpass');
console.log(ethpass);


// Initialize the Express App
const app = new Express();



import RoutesIndex from './routes/index';
import serverConfig from './config';
import contractUtils from './util/contractUtils';



// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api', RoutesIndex);



// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`VEX | QuandlOracle is running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});


// Launch Ethereum Node

Promise.delay(0).then(function(){
	var Geth = exec('geth --testnet --password '+ethpass+' account new', {maxBuffer: 1024*600}, function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
	return;
}).delay(10000).then(function(){
	var Geth = exec('geth --testnet', {maxBuffer: 1024*600}, function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
		  console.log('exec error: ' + error);
		}
	});
	return;
}).delay(1200000).then(function(){ // 20 minute delay to allow chain sync; possibly necessary....
  // should be polling right away here instead;

  return;

}).catch(function(error){
	console.log(error);
});

export default app;
