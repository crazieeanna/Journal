const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const homePageText = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutPageText =  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactpageText = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let postBody = [];

app.get('/', (req, res) => {
    res.render('home', {homeText: homePageText, postText: postBody});
});

app.get('/home', (req, res) => {
    res.render('home', {homeText: homePageText, postText: postBody})
});

app.get('/about-us', (req, res) => {
    res.render('about', {aboutText: aboutPageText});
});

app.get('/contact-us', (req, res) => {
    res.render('contact', {contactText: contactpageText});
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.get('/posts/:postName', (req, res)=> {
    res.render('home', {homeText: homePageText, postText: postBody});
    let postParams = req.params.postName;
    let postParamsLower = _.lowerCase(postParams);
    postBody.forEach(function(postTitle) {
        const storedTitle = postTitle.inputTitleValue; 
        const storedTitleLower = _.lowerCase(storedTitle);

        if( storedTitleLower === postParamsLower) {
            console.log("It's a Match");
            res.render('post', {postText: postBody});
        } else {
            console.log("It's not a match");
        }      
    });    
});

app.post('/', (req, res) => {
    let postBodyValue = {
        inputTitleValue: req.body.inputTitle,
        inputPostvalue: req.body.inputPost
    };
    postBody.push(postBodyValue);
    console.log(postBody);
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('Listen to 3000');
});