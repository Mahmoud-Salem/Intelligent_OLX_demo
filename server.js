var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


require('@tensorflow/tfjs-node');

var index = require('./routes/routes');
var app= express();


mongoose.connect('mongodb://localhost:27017/Project2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
     db.once('open', function callback () {
         console.log('Conntected To Mongo Database');
     });


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.static(__dirname + '/views/images'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',index);



//server
app.listen(8080,function(){

    console.log('Server started in 8080');

});
