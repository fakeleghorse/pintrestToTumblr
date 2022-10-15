
//     import { initializeApp } from "firebase/app";
//     import { getAnalytics } from "firebase/analytics";
//     doTumblrPhotoPost();
// export const pintrestToTumblr = () => {

//     var tumblr = require('tumblr.js');
//     let Parser = require('rss-parser');
//     let parser = new Parser();
//     console.log(" process.env.TUMBLR_CONSUMER_KEY",  process.env.TUMBLR_CONSUMER_KEY);
//     var client = tumblr.createClient({
//         consumer_key: process.env.TUMBLR_CONSUMER_KEY,
//         consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
//         token: process.env.TUMBLR_TOKEN,
//         token_secret: process.env.TUMBLR_TOKEN_SECRET,
//     });

//     let blogName = 'pappater';
//     let params = {}

//     async function doTumblrPhotoPost() {
//         let feed = await parser.parseURL('https://in.pinterest.com/capecapricorn/pappater.rss');
      
//                 feed.items.forEach((item,index)=>{
//                     if(index<1){
//                         let imageUrlFirstLvl = item.content.split("src=")[1].split("><")[0].replace("236x", "1200x");
//                         console.log("imageUrlFirstLvl", imageUrlFirstLvl)
//                         imageUrlFirstLvl = imageUrlFirstLvl.substring(1, imageUrlFirstLvl.length - 1);
//                         params.source = imageUrlFirstLvl;
//                         if (true) {
//                             console.log("no include");
//                             // post to tumblr
//                             client.createPhotoPost(blogName, params, function (err, resp) {
//                                 console.log("err", err); // your photo post is submitted to tumblr successfully.
//                             });
                          
//                         }
//                     }
//                 })
              
               

//     };


// } 