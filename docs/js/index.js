var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  url = 'https://restaurant.michelin.fr/search-restaurants?localisation=1424&cooking_type=&gm_selection=&stars=1%7C%7C2%7C%7C3&bib_gourmand=&piecette=&michelin_plate=&services=&ambiance=&booking_activated=&min_price=&max_price=&number_of_offers=&prev_localisation=1424&latitude=&longitude=&bbox_ne_lat=&bbox_ne_lon=&bbox_sw_lat=&bbox_sw_lon=&page_number=0&op=Rechercher&js=true'
    
    request(url, function(error, response, html){
        
        if(!eror){
            
            var $ = cheerio.load(html);
            
            var id, title, content_url;
            var json = {id: "", title: "", content_url: ""};
            
            $('.header').filter(function(){
                
                var data = $(this);
                
                id = data.children().first().text();
                
                title = data.children().first().text();

                content_url = data.children().first().text();

                json.id= id;
                json.title = title;
                json.content_url = content_url;
            })
        }
    })

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;

/*Load HTTP module
var http = require("http");

var testScrip ;

var urlAddress = "https://restaurant.michelin.fr/search-restaurants?localisation=1424&cooking_type=&gm_selection=&stars=1%7C%7C2%7C%7C3&bib_gourmand=&piecette=&michelin_plate=&services=&ambiance=&booking_activated=&min_price=&max_price=&number_of_offers=&prev_localisation=1424&latitude=&longitude=&bbox_ne_lat=&bbox_ne_lon=&bbox_sw_lat=&bbox_sw_lon=&page_number=0&op=Rechercher&js=true"
//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});
   // Send the response body "Hello World"

   function httpGet(urlAddress)
   {
       var xmlHttp = new XMLHttpRequest();
       xmlHttp.open( "GET", urlAddress, false ); // false for synchronous request
       xmlHttp.send( null );
       return xmlHttp.responseText;
   }

   response.end('Hello World\n');



}).listen(8080);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8080/')*/
