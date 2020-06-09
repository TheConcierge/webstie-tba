const IMG_PATH = './images/';

require('dotenv').config()

var express = require('express');
var hbs = require( 'express-handlebars');
var path = require('path');
var app = express();
var router = express.Router();
var helpers = require('handlebars-helpers')();
//Import the mongoose module
var mongoose = require('mongoose');

var PostModel = require('./models/post.model');
app.use('/admin', require('./admin'));
//set up file structure stuff I guess
var fs = require('fs');

//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/website';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({extended: false}));
app.use('/',router);
app.use(express.static(path.join(__dirname, 'public')));
var path = __dirname + '/views/';

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', __dirname + '/views/');  
app.set('view engine', 'hbs');

function readableDateTime(datetime) {
    var d = new Date(datetime);
    return d.toDateString();
}

router.get('/',function(req, res, next){
  PostModel.find({}, null, {sort: {'updated_at': -1}},(err, posts) => {
    if (err) throw err;
      res.render('index', {title: "Recent posts", page_name: "index", posts: posts.map(post => post.toJSON())});
  });
});

router.get('/articles/:post_id', function(req, res) {
    PostModel.findOne({'custom_id': req.params.post_id, 'category': 'articles'}, function(err, post) {
        if (post) {
            res.render('article', {title: post.title, post: post.toJSON()});
        } else {
            console.log('could not find element');
        }
  });
});

router.get('/cocktails/:post_id', function(req, res) {
    PostModel.findOne({'custom_id': req.params.post_id, 'category': 'cocktails'}, function(err, post) {
        if (post) {
            res.render('cocktail', {title: post.title, post: post.toJSON()});
        } else {
            console.log('could not find element');
        }
  });
});

router.get('/articles', function(req, res) {
    PostModel.find({"category": "articles"}, function(err, posts) {
        res.render("category-list", {title: "Articles", posts: posts.map(post => post.toJSON())});
    });
});

router.get('/recipes',function(req, res){
    res.render('temp-recipes');
});

router.get('/cocktails', function(req, res) {
    PostModel.find({"category": "cocktails"}, function(err, posts) {
        res.render("category-list", {title: "Cocktails", posts: posts.map(post => post.toJSON())});
    });
});

router.post('/search',function(req, res){
  const search_name = req.body.name;
  PostModel.find({"title": {"$regex": search_name, "$options" : "i"}}, function(err, posts) {
    res.render('search-list', {title: "Search results", posts:posts.map(post => post.toJSON())});
  });
});

router.get('/images/:fileName', function(req, res) {
    let fileName = req.params.fileName;
    try {    
        if (fileName) {
            res.sendFile(fileName, {root: IMG_PATH});
        } else {
            res.status(404).send('Image not found');
        } 
    } catch (err) {
        console.error(err);
    }
});

router.get('/about',function(req, res){
    res.render('about');
});

router.get('/roadmap',function(req, res){
    res.render('roadmap');
});


app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});
 
const PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
  console.log('Server running at Port 3000');
});
