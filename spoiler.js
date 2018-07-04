/*take two arguments; movie and number of seconds before spoilage.
create an output showing movie and time until spoilage.
Initalize and install node package libraries.
get google search results for movie title to display while time counts down.
access the TMDB to print the movie's plot after the time runs out*/
const request = require("request")
const cheerio = require("cheerio")
//defining my command inputs
process.argv;
var title = process.argv[2]
var seconds = process.argv[3];
//my overall function that is invocated at the bottom,
//inside it calls my secondary functions
function spoilerWarning(title, seconds, ) {
    //some validation statements
    if (seconds < 3 || isNaN(seconds) || !isNaN(title)) {
        console.log("invalid input please enter a movie title and number of seconds above 3")
    } else {
        seconds = parseInt(seconds) * 1000;

        setTimeout((spoiler) => {
            let url = "https://api.themoviedb.org/3/search/movie?query=" + title + "&language=en-US&api_key=234fc3baa7a94ed54a0d6fc44e1a2f24"
            let selector = "p.overview";
            spoiler = plot(url, selector);
        }, seconds);

        countdown = seconds / 1000;
        console.log("Your movie," + " " + title + " " + "will ruined in" + " " +
            countdown + " " + "seconds");

        let url = "https://www.google.ca/search?q=" + title;
        let selector = ("h3.r")
        getHeadlines(url, selector);
    }
}
/*I defined these two secondary functions outside the main function 
and gave them variable parameters so I could invoke them
 within my main function, without them actually being inside of 
 my main function */
function getHeadlines(url, selector) {
    request(url, (error, response, body) => {
        console.log("Here's some news about:");
        var headlines = [];
        var $ = cheerio.load(body);
        $(selector).each((i, headlines) => {
            console.log($(headlines).text());
        });
    });
}
//I originally wanted to only have one function for both GET
//requests, but it turns out they had to be slighty different
const plot = (url, selector) => {
    request(url, (error, response, body) => {
        var obj = JSON.parse(body);
        console.log("You were warned...");
        /*A brief pause between the message above and the plot of 
        being displayed, for dramatic effect.Also a error message
        if the input was gibberish, I realize it would make more sense at the
        beginning of the program but I didn't want to restructure my control
        flow, plus Google will still display the search results which may
        be good for a laugh:) */
        setTimeout((text) => {
            if (obj.total_results === 0) {
                console.log("Please choose a actual movie title, not an imaginary one")
            } else {
                var text = obj.results[0].overview;
                console.log(text);
            }
        }, 2000)
    })
}

spoilerWarning(title, seconds);