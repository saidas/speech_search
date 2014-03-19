var speech = require('google-speech-api');

speech({file: 'audio.wav'}, function (err, results) {
	if(err) console.log(err);
  console.log(results);
  // [{status: 0, id: '...', hypotheses: [{utterance: 'this is a test', confidence: 0.9162679}]}]}]
});