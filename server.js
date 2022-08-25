const express = require('express');
config = require('./server/configure.js');
let app = express();

app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app = config(app);

const server = app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});
