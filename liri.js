require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var operator = process.argv[2];

switch (operator) {
case 'concert-this':
    concertthis();
    break;

case 'spotify-this-song':
    spotifythissong();
    break;

case 'movie-this':
    moviethis();
    break;

case 'do-what-it-says':
    dowhat();
    break;
}

// concert-this

function concertthis() {

    var search = process.argv[3];

    // default
    if (!search) {
        search = "mr+nobody"
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            var concert = response.data;

            if (concert.length > 5) {
                for (var i = 0; i < 5; i++) {
                    console.log(`\n******************************************************\n`)
                    console.log(`   Artist/Band: ${concert[i].lineup[0]}`)
                    console.log(`   Venue: ${concert[i].venue.name}`)
                    console.log(`   Location: ${concert[i].venue.city}, ${concert[i].venue.region}`)
                    console.log(`   Date: ${moment(concert[i].datetime).format("MM/DD/YYYY")}`)
                };
                console.log(`\n******************************************************`)
            } else {
                for (var i = 0; i < concert.length; i++) {
                    console.log(`   Artist/Band: ${concert[i].lineup[0]}`)
                    console.log(`   Venue: ${concert[i].venue.name}`)
                    console.log(`   Location: ${concert[i].venue.city}, ${concert[i].venue.region}`)
                    console.log(`   Date: ${moment(concert[i].datetime).format("MM/DD/YYYY")}`)
                };
                console.log(`\n******************************************************`)
            }
        }
    );
};

// spotify-this-song

function spotifythissong() {

    var search = process.argv[3];

    //default 
    if (!search) {
        search = "the+sign"
    }


    spotify.search({ type: 'track', query: search }, function (err, response) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(response.tracks.items[0]);

        // displays 5 songs
        for (var i = 0; i < 5; i++) {
            var track = response.tracks.items[i];

            console.log(`\n******************************************************\n`)
            console.log(`   Artist/Band: ${track.artists[0].name}`)
            console.log(`   Song: ${track.name}`)
            console.log(`   Preview Song: ${track.external_urls.spotify}`)
            console.log(`   Album: ${track.album.name}`)
        };
        console.log(`\n******************************************************`)

    });
};

// movie-this

function moviethis(movie) {
    var movie = process.argv[3];

    if (!movie) {
        movie = "mr+nobody"
    }

    capMovie = movie.toUpperCase();


    var data = axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(
        function(response) {
            console.log(`${capMovie}
            Released: ${response.data.Released}
            Rating: ${response.data.imdbRating}
            RottenTomatoes:${response.data.Ratings[1].Value}
            Country: ${response.data.Country}
            Language: ${response.data.Language}
            Plot: ${response.data.Plot}
            Actors: ${response.data.Actors}`)

          }
        )
};

// do-what-it-says
function dowhat() {
     
    fs.readFile("random.txt", "utf8", function (error, response) {

        if (error) {
            return console.log(error);
        }

        var textArray = response.split(",");

        console.log(textArray);

    });

        for (var i = 0; i < textArray.length; i++) {
            console.log(textArray[i])

            if (i % 2 === 0) {
                command = textArray[i];
            } else {
                search = textArray[i]
            }

        };

        console.log(`\n\n` + command, search);

        if (command == "concert-this") {
            concertThis();
        } else if (command == "spotify-this-song") {
            spotifyThis();
        } else if (command == "movie-this") {
            movieThis();
        } else {
            console.log(`\n******************************************************\n`)
            console.log(`   LIRI does not understand.`)
            console.log(`\n   Try these commands: `)
            console.log(`\n   concert-this\n   spotify-this-song\n   movie-this\n   do-what-it-says\n   say-hi`)
            console.log(`\n******************************************************`)
        }
    }
