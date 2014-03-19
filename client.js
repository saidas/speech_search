var client = BinaryClient('ws://localhost:9000');
client.on('open', function(stream){
  var stream = client.createStream({file: 'hello.txt'});
  stream.write('Hello');
  stream.write('World!');
  stream.end();
});

client.on('error',function(e){
	console.log('error');
	console.log(e);
})

client.on('close',function(e){
	console.log('close');
	console.log(e);

	
})