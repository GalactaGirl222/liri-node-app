require("dotenv").config();//add code to read and set any environment variables with the dotenv package
const keys = require("./keys.js");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");

var spotify = new Spotify(keys.spotify);

let queryType = process.argv[2];
let query = process.argv.slice(3).join(" ");

var writeToLog = function(data) {
    // Append the JSON data and add a newline character to the end of the log.txt file
    fs.appendFile("log.txt", JSON.stringify(data) + "\n", function(err) {
      if (err) {
        return console.log(err);
      }
  
      console.log("log.txt was updated!");
    });
  };

runLiri();

function runLiri(){
    switch(queryType){
        case "concert-this":
            getEvents(query);
            break;

            case "spotify-this-song":
            if (!query) query = "this sign";
            getSong(query);
            break;

            case "do-what-it-says":
                fs.readFile("./random.txt", "utf8", (err,data) => {
                  if (err) throw err;
                  queryTypw = data.split(",") [0]; 
                  query= data.split(",")[1];
                  runLiri();
                });
                break;
    };
    let log = `${queryType} ${query}`;
    logCommand(log);
};

function getEvents(band){
    let appID = key.BandInTown.appID
    let queryURL= `https://rest.bandsintown.com/artists/${band}/events?app_id=${appID}`;
    axios.get(queryURL).then((response)=> {
        let event = response.data[1];
        let responseData = event.dataTime.split("T")[0];
        let momentData = moment(responseData, "YYYY-MM-DD");
        let data = moment(momentData).format("MM/DD/YYY");
        Console.log(`
        Venue:${event.venue.name}
        Location:${event.venue.city},${event.venue.region}
        Data:${data}
        `);
    })
    .catch((errs)=>{
        console.log(errs);
    });

};

function getSong(songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log(err);
        };        
        let response = (data.tracks.items[0]);
        console.log(`
        Band/artist: ${response.artists[0].name}
        Song name: ${response.name}
        Album: ${response.album.name}
        Link: ${response.external_urls.spotify}`);
    });
};

function getMovie(movieName) {
    let title = movieName;
    let apiKEY = keys.OMDB.apiKEY;
    let queryURL = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKEY}&t=${title}`
    axios.get(queryURL).then((response) => {
            let result = response.data;
            console.log(`
            Title: ${result.Title}
            Release Year: ${result.Year}
            IMDB Rating: ${result.imdbRating}
            RT Rating: ${result.Ratings[1].Value}
            Country: ${result.Country}
            Languauge: ${result.Language}
            Plot: ${result.Plot}
            Actors: ${result.Actors}`);
        })
        .catch((err) => {
            console.log(err);
        })
};

function logCommand (log) {
    fs.appendFile("log.txt", log, (err) => {
        if (err) throw err;
    });
};