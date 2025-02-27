import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import _ from 'lodash';


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

//Home route method , rendering posts[] on home page
app.get("/", (req, res) => {
    res.render("home", {
        homeContent: homeStartingContent,
        posts: posts,
    });
})

//about route, with some static contents 
app.get("/about", (req, res) => {
    res.render("about", {aboutContent: aboutContent});
});
  
//contact route with static content
app.get("/contact", (req, res) => {
    res.render("contact", {contactContent: contactContent});
});

//compose route 
app.get("/compose", (req, res) => {
    res.render('compose')
})

//Compose post method that accepts inputs, process it with body-parser and stores it in an object in the post array
app.post("/compose", (req, res) => {
    const postTitle = req.body.postTitle
    const postBody = req.body.postBody
    const postObj = {
      title: postTitle,
      content: postBody
    }
    posts.push(postObj)
    res.redirect("/")
})


// Define a route to handle requests for individual posts
app.get('/posts/:postID', (req, res) => {
    // Extract the requested postID from the request parameters and convert it to lowercase
    const requestedTitle = _.lowerCase(req.params.postID);

    // Find the post with a title that matches the requested postID
    let foundPost = posts.find(post => _.lowerCase(post.title) === requestedTitle);

    // Check if a post with the requested title was found
    if (foundPost) {
        // If a post was found, render the 'post' template with the title and content of the found post
        res.render('post', {
            title: foundPost.title,
            content: foundPost.content
        });
    } else {
        // If no post was found with the requested title, send a message indicating that the post was not found
        res.send("Post not found.");
    }
});


app.listen(3000, () => {
    console.log("Listening on PORT 3000");
})