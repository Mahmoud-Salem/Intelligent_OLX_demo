var express = require('express');
var path = require('path');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'views/images/' });
var postController = require('../controllers/postController');





router.get('/posting',function(req,res)
{
    res.render('Posting.ejs');
});
router.get('/',function(req,res)
{

    res.render('home.ejs');
});
router.get('/view',postController.get);

router.post('/posting',upload.single('pic'), postController.post);




module.exports=router ;
