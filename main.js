const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request = require("request");
const cheerio = require("cheerio");
request(url, callBack);

function callBack(error, response, html) {
    if (error) {
        console.log(err);
    } 
    else {
        extractResultPageLink(html);
    }
}

function extractResultPageLink(html) {
    const $ = cheerio.load(html);
    const anchorElement = $("a[data-hover='View All Results']");
    const link = anchorElement.attr("href");
    const fullLink = "https://www.espncricinfo.com" + link;
    getAllMatchesLink(fullLink);
}

function getAllMatchesLink(allMatchResultPageLink) {
    request(allMatchResultPageLink, callBack);
    function callBack(error, response, html) {
        if (error) {
            console.log(error);
        }
        else {
            extractAllMatchScoreCardLink(html);
        }
    }
}

function extractAllMatchScoreCardLink(allMatchResultPageBody) {
    const $ = cheerio.load(allMatchResultPageBody);
    const scoreCardElements = $("a[data-hover='Scorecard']");
    for(let i=0; i < scoreCardElements.length; i++) {
        let scoreCardLink = $(scoreCardElements[i]).attr("href");
        let fullScoreCardLink = "https://www.espncricinfo.com" + scoreCardLink;
        console.log(fullScoreCardLink);
    }
}