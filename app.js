var mongoose = require('mongoose');
const fileupload=require('express-fileupload');
var app = require('express')();
var express = require('express');
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
//var SignupApi = require('./routes/SignupApi.js')
//var LoginApi = require('./routes/LoginApi.js')
// var ProductApi = require('./routes/ProductUploadApi.js')
// var FetchApi = require('./routes/FetchProductApi.js')
 var FormApi = require('./routes/FormApi.js')
var UserApi = require('./routes/UserApi.js')
 var StakeholderApi = require('./routes/StakeholderApi.js')


app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(fileupload());
var port = 8080;
server=app.listen(port);
var io = require('socket.io').listen(server); 
// app.use('/signup', SignupApi);
// app.use('/login', LoginApi);
// app.use('/product',ProductApi);
// app.use(express.static('public'));
// app.use('/fetch', FetchApi);
app.use('/form', FormApi);
app.use('/user', UserApi);
app.use('/stakeholder', StakeholderApi);

var uri = 'mongodb://keshav:keshav@ds119355.mlab.com:19355/exchanger';
mongoose.connect(uri, function (err) {
    if (err) { throw err; }
});


console.log('hi');
io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    socket.emit('info', { msg: 'The world is round, there is no up or down.' });
});


