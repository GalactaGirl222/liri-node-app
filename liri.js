require("dotenv").config();//add code to read and set any environment variables with the dotenv package
const keys = require("./keys.js");
const fs = require("fs");
const Spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");


let queryType = process.argv[2];
let query = process.argv.slice(3).join(" ");

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
                fs.readFile("./random.txt", "utf8", (errs,data) => {
                  if (err) throw err;
                  queryTypw = data.split(",")  
                })
    }
}