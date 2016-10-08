var programToRun = (process.argv[2]);
var featureRequested = (process.argv[3]);

if (programToRun == "twitter") {
	getTweets(featureRequested);
} else if (programToRun == "spotify") {
	getSpotify(featureRequested);
} else if (programToRun == "omdb") {
	getMoviePlot(featureRequested);

} else {
	console.log("Maybe you could give me clearer instructions...\nType omdb followed by a movie title for the plot.\nType Twitter to see my most recent tweets.\nType Spotify to get some random information from the Spotify API.\n");
}

function getTweets(featureRequested) {
	// console.log("In the twitter function.");
	var Twitter = require('twitter');
	var keys = require('./keys.js');

  var client = new Twitter(keys.twitterKeys);

  var params = {screen_name: 'tomcariello'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i=0; i < tweets.length; i++) {
        console.log(tweets[i].created_at + ": " + tweets[i].text);
      }
    }
  });

}

function getSpotify(featureRequested) {
	console.log("Spotify!");

  var keys = require('./keys.js');

  var SpotifyWebApi = require('spotify-web-api-node');

  var spotifyKeys = new SpotifyWebApi(keys.SpotifyWebApi);

spotifyKeys.searchTracks(featureRequested)
  .then(function(data) {
    console.log('Search by ' + featureRequested + ": " + JSON.stringify(data.body.tracks.items[0].album.name, null, 2) + " by " + JSON.stringify(data.body.tracks.items[0].artists[0].name, null, 2));
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
