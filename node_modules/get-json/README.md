## get-json

Request wrapper for fetching JSON by default. Eleminates `response` parameter.

```bash
$ npm install get-json
```

## Usage

```js
getJSON = require('get-json')

getJSON('http://multiplayerchess.com/api', function(error, response){

    response.ok
    // => true

})
```

![](https://dl.dropbox.com/s/9q2p5mrqnajys22/npmel.jpg?token_hash=AAHqttN9DiGl63ma8KRw-G0cdalaiMzrvrOPGnOfDslDjw)
