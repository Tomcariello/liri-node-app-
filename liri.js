var programToRun = (process.argv[2]);
var featureRequested = (process.argv[3]);

if (programToRun == "twitter") {
	getTweets(featureRequested);
} else if (programToRun == "spotify") {
  	 getSpotify(featureRequested);
} else if (programToRun == "omdb") {
	getMoviePlot(featureRequested);
} else if (programToRun == "do-what-it-says") {
  var fs = require('fs');

  fs.readFile('random.txt', 'utf8', function(err, data) {
   
   featureRequested = data;
    getSpotify(featureRequested);
  })
} else {
	console.log("Maybe you could give me clearer instructions...\nType omdb followed by a movie title for the plot.\nType Twitter to see my most recent tweets.\nType Spotify to get some random information from the Spotify API.\n");
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
		    // console.log(JSONresult);
		    console.log("Title: " + JSONresult.Title);
		    console.log("Release Date: " + JSONresult.Year);
	    	console.log("Rating: " + JSONresult.Rated);
	    	console.log("Country: " + JSONresult.Country);
	    	console.log("Language: " + JSONresult.Language);
	    	console.log("Plot: " + JSONresult.Plot);
		  	console.log("Actors: " + JSONresult.Actors);
		  	console.log("IMDB Rating: " + JSONresult.imdbRating);
		  	console.log("IMDB URL: " + JSONresult.Poster);
 		}
	})
}
