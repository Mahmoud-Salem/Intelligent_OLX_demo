const {createCanvas, Image } = require('canvas')

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

var cocoSsd = require('@tensorflow-models/coco-ssd')
global.model;

const modelPromise = cocoSsd.load('lite_mobilenet_v2');
modelPromise.then(coco => {
    global.model = coco
    //console.log(coco)
    console.log('model uploaded successfully');
 })
 .catch(error => {
    console.error(error);
 });



var mongoose = require('mongoose');
const sharp = require('sharp');

var projSchema = new mongoose.Schema({
    username :{
    type :String,
    required:true
      },
    object :String ,
    telephone: Number,
    pp:String ,
    description:String,
    price:Number,
},{collection:'Projects'});


var post = mongoose.model('Project2', projSchema);

let postController = {

    post : function(req, res)
    {
        if(req.file)
       {
          canvas = createCanvas(500, 500)
          ctx = canvas.getContext('2d')
          img = new Image()
          img.onload = () => ctx.drawImage(img, 0, 0)
          img.onerror = err => { throw err }
          img.src = 'views/images/'+req.file.filename
          ctx.drawImage(img, 0, 0, 500, 500);
          prediction = model.detect(canvas);
          prediction.then(predictions => {

            var dimensions;
            for(var i = 0; i < predictions.length; i++) {
              var obj = predictions[i];
              if(obj.class == req.body.object)
              {
                dimensions = obj.bbox
              }
          }
            if (dimensions != undefined)
            {
            outputImageName = 'scaled_'+req.file.filename;
            sharp('views/images/'+req.file.filename).resize(500, 500).extract({ width: parseInt(dimensions[2],10), height: parseInt(dimensions[3],10), left: parseInt(dimensions[0]), top: parseInt(dimensions[1]) }).toFile('views/images/'+outputImageName)
                .then(function(new_file_info) {
                    console.log("Image cropped and saved");
                    var temp = new post({
                      username:req.body.uname ,
                      telephone:req.body.tel,
                      object: req.body.object,
                      pp:"/"+outputImageName,
                      description:req.body.description,
                      price: req.body.price,
                    });
                
                          temp.save(function(err, temp){
                         if(err){
                            res.render('Posting.ejs',{error:true});
                         }
                         else{
                               res.render('Posting.ejs',{right:true});
                         }
                     });
                })
                .catch(function(err) {
                    console.log("An error occured",err);
                });
              } else {
                res.render('Posting.ejs',{error:true});
              }
         })
         .catch(error => {
            res.render('Posting.ejs',{error:true});
            console.error(error);
         });         
        }
        },
       get : function(req,res)
       {
         post.find(function(err,projects)
         {
           res.render('view.ejs',{projects});
         });
       }
        

}




module.exports = postController;
