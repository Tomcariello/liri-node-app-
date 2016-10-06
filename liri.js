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

	//https://www.npmjs.com/package/node-twitter-api

	
	console.log("Twitter!");

	var twitterAPI = require('node-twitter-api');

	var twitter = new twitterAPI({
    consumerKey: 'your consumer Key',
    consumerSecret: 'your consumer secret',
    callback: 'http://yoururl.tld/something'
});

}

function getSpotify(featureRequested) {
	console.log("Spotify!");
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
