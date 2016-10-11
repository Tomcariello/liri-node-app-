//Store user arguments
var programToRun = (process.argv[2]);
var featureRequested = (process.argv[3]);

//require fs to facilitate file reading & writing
var fs = require('fs');

function processRequest(){

  if (programToRun == "my-tweets") {
  	getTweets(featureRequested);
  } else if (programToRun == "spotify-this-song") {
    getSpotify(featureRequested);
  } else if (programToRun == "movie-this") {
  	getMoviePlot(featureRequested);
  } else if (programToRun == "do-what-it-says") {

    //Read random.txt file
    fs.readFile('random.txt', 'utf8', function(err, data) {

      //split data into command/request pairs
      featureRequested = data.split("|");

      //generate random number from 0 to the number of possibilities in the file
      var randomNumber = Math.floor( Math.random() * featureRequested.length);

      //split the randomly selected feature/request into 2 parts
      pullFeatures = featureRequested[randomNumber].split(",");

      //assign these values to the argv variables for proccessing
      programToRun = pullFeatures[0];
      featureRequested = pullFeatures[1];

      //re-call the process loop with the new values
      processRequest();
    })
  } else {
  	console.log("Maybe you could give me clearer instructions...\nType 'movie-this' followed by a movie title for the plot.\nType 'my-tweets' to see my most recent tweets.\nType 'spotify-this-song' to get some information from the Spotify API.\n");
  }
}


function getTweets(featureRequested) {
	var Twitter = require('twitter');
	var keys = require('./keys.js');

  var client = new Twitter(keys.twitterKeys);

  var params = {screen_name: 'tomcariello'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i=0; i < tweets.length; i++) {
        var humanTime = tweets[i].created_at.split(" ");
        console.log(humanTime[1] + " " + humanTime[2] + " " + humanTime[5] + ": " + tweets[i].text);
        fs.appendFile('log.txt', "**********\r\n" + humanTime[1] + " " + humanTime[2] + " " + humanTime[5] + ": " + tweets[i].text  + "\r\n**********\r\n", function(err) {
          if (err) {
            return console.log(err);
          }
        })
      }
    }
  });

}

function getSpotify(featureRequested) {
  if (featureRequested == null) {
    featureRequested = "I want it that way";
  }

  var keys = require('./keys.js');

  var SpotifyWebApi = require('spotify-web-api-node');

  var spotifyKeys = new SpotifyWebApi(keys.SpotifyWebApi);

  spotifyKeys.searchTracks(featureRequested)
    .then(function(data) {
      console.log('Artist: ' + JSON.stringify(data.body.tracks.items[0].artists[0].name, null, 2));
      console.log('Song Title:  ' + featureRequested);
      console.log('Preview Link:  ' + JSON.stringify(data.body.tracks.items[0].preview_url, null, 2));
      console.log('Album Name:  ' + JSON.stringify(data.body.tracks.items[0].album.name, null, 2));
      
      fs.appendFile('log.txt', "**********\r\n" + 
        'Artist: ' + JSON.stringify(data.body.tracks.items[0].artists[0].name, null, 2) + "\r\n" + 
        'Song Title:  ' + featureRequested + "\r\n" + 
        'Preview Link:  ' + JSON.stringify(data.body.tracks.items[0].preview_url, null, 2) + "\r\n" + 
        'Album Name:  ' + JSON.stringify(data.body.tracks.items[0].album.name, null, 2) + "\r\n" + "**********\r\n", 

        function(err) {
            if (err) {
              return console.log(err);
            }
          })
    }, function(err) {
      console.error(err);
    });
}

function getMoviePlot(featureRequested) {

	if (featureRequested == null) {
		featureRequested = "Mr. Nobody";
	}

	var request = require('request');
	var omdbUrl = "http://www.omdbapi.com/?t=" + featureRequested;

	request(omdbUrl, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    		var JSONresult = JSON.parse(body);
		    console.log("Title: " + JSONresult.Title);
		    console.log("Release Date: " + JSONresult.Year);
	    	console.log("Rating: " + JSONresult.Rated);
	    	console.log("Country: " + JSONresult.Country);
	    	console.log("Language: " + JSONresult.Language);
	    	console.log("Plot: " + JSONresult.Plot);
		  	console.log("Actors: " + JSONresult.Actors);
		  	console.log("IMDB Rating: " + JSONresult.imdbRating);
		  	console.log("IMDB URL: " + JSONresult.Poster);

        fs.appendFile('log.txt', "**********\r\n" + 
        "Title: " + JSONresult.Title + "\r\n" +
        "Release Date: " + JSONresult.Year + "\r\n" +
        "Rating: " + JSONresult.Rated + "\r\n" +
        "Country: " + JSONresult.Country + "\r\n" +
        "Language: " + JSONresult.Language + "\r\n" +
        "Plot: " + JSONresult.Plot + "\r\n" +
        "Actors: " + JSONresult.Actors + "\r\n" +
        "IMDB Rating: " + JSONresult.imdbRating + "\r\n" +
        "IMDB URL: " + JSONresult.Poster + "\r\n" +
        "**********\r\n", function(err) {
          if (err) {
            return console.log(err);
          }
        })


 		}
	})
}


processRequest();