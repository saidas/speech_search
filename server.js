var speech = require('google-speech-api');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var server = BinaryServer({port: 9000});
var http = require('http');
var Static = require('node-static');

// обычный сервер (статика) на порту 8080
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  
  fileServer.serve(req, res);

}).listen(88);

console.log("HTTP Сервер запущен на портах 88");



getJSON = require('get-json');


function recognize(files){

speech({file: files}, function (err, results) {
	if(err) console.log(err);
  console.log(results);
  console.log("Result: %j",results);
  // return results;
//   getJSON('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=google', function(error, response){

//     if(response.ok){
//       console.log(response);
//     }
//     // => true

// })

//   // [{status: 0, id: '...', hypotheses: [{utterance: 'this is a test', confidence: 0.9162679}]}]}]
});

  

}




console.log("Бинарный Сервер запущен на порту : 9000");
server.on('connection', function(client){
	console.log("connection");
  client.on('stream', function(stream, meta){
  	console.log("stream");
    var file = fs.createWriteStream('/var/www/server/'+meta.file,{ flags: 'w',
  encoding: null,
  mode: 0777 });
    stream.pipe(file);
    stream.on('end', function(stream){
	console.log('Ended : Process Recognize');
    if(meta.file=='audio.wav'){
    	// exec('chmod 755 '+meta.file);

          speech({file: '/var/www/server/'+meta.file,  lang: 'ru-RU'}, function (err, results) {
            if(err) console.log(err);

            // console.log("Result: %j",results);

            // console.log('========');
            // console.log(results[0][0]);
            if(results[0][0].hypotheses[0].utterance!=(undefined|null)){
                console.log(results[0][0].hypotheses[0].utterance);

// results[0][0].hypotheses.utterance
            getJSON('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q='+encodeURIComponent(results[0][0].hypotheses[0].utterance), function(error, response){

              if(response.ok){
                // console.log(response.responseData);
                // client.end();
              }
                client.send(response.responseData);
              // => true

          })
          }
            
            // return results;

          //   // [{status: 0, id: '...', hypotheses: [{utterance: 'this is a test', confidence: 0.9162679}]}]}]
          });
    }
    }
    )
  }); 
});
