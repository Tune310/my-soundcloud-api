var
  express= require('express'),
  apiRouter = express.Router(),
  bodyParser= require('body-parser'),
  SC= require('node-soundcloud'),
  path = require('path'),
  app= express()

  //Initializing node-soundcloud with env variables
  SC.init({
    id: '030341538cff3ba796885fa35911cb51',
    secret: '030341538cff3ba796885fa35911cb51',
   })


  app.use(express.static(path.join(__dirname, '/public')))
  app.use(bodyParser.json())

  //recieving the widget player from the front end
  app.get('/', function(req, res){
  res.sendFile('index.html')
  })


  //go into the test route and recieve the data in the params artist from a user input in the url
  app.get('/test/:artist', function(req, res){
    //Soundcloud requests tracks under this artist
    SC.get('/tracks', {q: req.params.artist}, function(err, track) {
  if ( err ) {
    throw err;
  } else {
    // if the input is true json will set us data under the input
    res.json('track retrieved:', track);
    }
  });
  })

// Phillipe example:
  //
  // apiRouter.route('/getArtist')
  //   .get(function(req,res){
  //     var response = {};
  //     console.log(req)
  //     SC.get('/', {q: req.artist.playerUrl}, function(err, results) {
  //       console.log(req.artist.playerUrl)
  //       if (err) {
  //         throw err;
  //       } else {
  //         response.artists = [];
  //         for(var i = 0; i < results.length; i += 1) {
  //           response.artists.push(results[i].id);
  //         }
  //         console.log('user searching is NOT logged in');
  //         response.userIsLoggedIn = false;
  //         res.json(response);
  //       }
  //     })
  //   })

  app.listen(3000, function(){
    console.log('Listening on port 3000 ')
  })
// function playSomeSound(genre) {
//   SC.get('/tracks', {
//     genres: genre,
//   }, function(tracks) {
//     var random = Math.floor(Math.random() * 49);
//     SC.oEmbed(tracks[random].uri, { auto_play: true }, document.getElementById('target'));
//   });
// }
//
// window.onload= function() {
//   SC.initialize({
//     client_id: '030341538cff3ba796885fa35911cb51'
//   });
//   var menuLinks = document.getElementsByClassName('genre');
//   for (var i = 0; i < menuLinks.length; i++){
//     var menuLink = menuLinks[i];
//     menuLink.onclick = function(e) {
//       e.preventDefault();
//       playSomeSound(menuLink.innerHTML);
//     };
//   }
// };
