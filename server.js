var speech = require('google-speech-api');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var server = BinaryServer({port: 9000});


function recognize(files){

speech({file: files}, function (err, results) {
	if(err) console.log(err);
  console.log(results);
  // [{status: 0, id: '...', hypotheses: [{utterance: 'this is a test', confidence: 0.9162679}]}]}]
});

}


// recognize('/var/www/server/audio.wav');


console.log("Start");
server.on('connection', function(client){
	console.log("connection");
  client.on('stream', function(stream, meta){
  	console.log("stream");
    var file = fs.createWriteStream('/var/www/server/'+meta.file,{ flags: 'w',
  encoding: null,
  mode: 0777 });
    stream.pipe(file);
    stream.on('end', function(stream){
    if(meta.file=='audio.wav'){
    	// exec('chmod 755 '+meta.file);
    recognize('/var/www/server/'+meta.file);
    }
    }
    )
  }); 
});