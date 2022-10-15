const express = require('express'); //Import the express dependency
const { pintrestToTumblr } = require('./modules/pintrestToTumblr');
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 4000;                  //Save the port number where your server will be listening
require('dotenv').config();
var cron = require('node-cron');

// node code 
var tumblr = require('tumblr.js');
let Parser = require('rss-parser');
let parser = new Parser();
console.log(" process.env.TUMBLR_CONSUMER_KEY", process.env.TUMBLR_CONSUMER_KEY);
var client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
    token: process.env.TUMBLR_TOKEN,
    token_secret: process.env.TUMBLR_TOKEN_SECRET,
});
const firebaseConfig = {
    apiKey: "AIzaSyBjBAxoHBh_Sun8tn9-r89HTD21T8OMsU4",
    authDomain: "pintresttotumblr.firebaseapp.com",
    projectId: "pintresttotumblr",
    storageBucket: "pintresttotumblr.appspot.com",
    messagingSenderId: "339370960263",
    appId: "1:339370960263:web:04c8ee2ab18d0e52319f22",
    measurementId: "G-2RFH44P0P7"
};

const firebase = require("firebase");
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({message: 'alive'});
  });
// Required for side-effects
require("firebase/firestore");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

let blogName = 'pappater';
let params = {}

async function doTumblrPhotoPost() {
    let feed = await parser.parseURL('https://in.pinterest.com/capecapricorn/pappater.rss');
    let docRef = db.collection("urls").doc("url");
    docRef.get().then((doc) => {
        if (doc.exists) {
           let existingUrl = doc.data().data
           feed.items.forEach((item, index) => {
            if (index <=20) {
                let imageUrlFirstLvl = item.content.split("src=")[1].split("><")[0].replace("236x", "1200x");
                imageUrlFirstLvl = imageUrlFirstLvl.substring(1, imageUrlFirstLvl.length - 1);
                params.source = imageUrlFirstLvl;
                if (!existingUrl.includes(imageUrlFirstLvl)) {
                    console.log("no include");
                    // post to tumblr
                    client.createPhotoPost(blogName, params, function (err, resp) {
                        if(resp){
                            console.log("posted to tumblr >>>>>"); 
                            db.collection("urls").doc("url").set({data:[...existingUrl,imageUrlFirstLvl ]});
                        }
                      // your photo post is submitted to tumblr successfully.
                        // if(!err){
                           
                        // }
                    });
    
                }
            }
        })
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
    
};
 cron.schedule("*/1 * * * * *", () => {
        console.log("calling >>>>>>> doTumblrPhotoPost()");
        doTumblrPhotoPost();
    });


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});