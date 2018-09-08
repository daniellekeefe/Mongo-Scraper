const request = require("request");
const mongoose = require('mongoose');
const cheerio = require("cheerio");

module.exports = function (app) {

    app.get('/articles', function (req, res) {
        request("https://www.nytimes.com/topic/subject/gardens-and-gardening", function(error, response, html) {

            const $ = cheerio.load(html);

            const results = [];
            const links = [];
            const titles = [];
            
            $("a.story-link").each(function(i, element) {

                const link = $(element).attr("href");
                const title = $($(element).find("h2.headline")[0]).text().trim();
                results.push({
                link: link,
                title: title
                });
            });

            // $("h2.headline").each(function(i, element) {

            //     const title = $(element).text();
            
            //     titles.push({
            //     title: title,
            //     });
            // });
            
            
            res.json(results);
        });

    });

};

