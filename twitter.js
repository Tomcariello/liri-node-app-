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
	console.log("Twitter!");
}

function getSpotify(featureRequested) {
	console.log("Spotify!");
}


function getMoviePlot(featureRequested) {
	var http = require('http');
	var omdbUrl = "http://www.omdbapi.com/?t=" + featureRequested;
	
	var req = http.request(omdbUrl, (res) => {
	  res.setEncoding('utf8');
	  res.on('data', (response) => {
	    var JSONresult = JSON.parse(response);
	  	console.log("The plot of " + featureRequested + " is: " + JSONresult.Plot);
	  });
	  res.on('end', () => {
	  });
	});

	req.on('error', (e) => {
	  console.log(`There was a problem with request: ${e.message}`);
	});

	// write data to request body
	req.write('postdata');
	req.end();
}