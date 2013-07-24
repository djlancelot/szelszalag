#!/usr/bin/env node
var express = require("express");

var app = express();
var wind = require("./datagrepper.js");

htmlize = function(param){
    var i =0;
    var out='';
    for(i=0;i<param.length;i++){
	out += "<p><b>" + param[i].name + "</b> " + param[i].windSpeed +
	    " " + param[i].windDir + "</p>\n";
    }
    return out;
}

app.get('/', function(req, res){
  var header = "<!DOCTYPE html><html><head><title>Winder</title></head><body>\n";
  var footer = "</body></html>\n";
  var body =htmlize(wind.getData());
 
  res.send(header + body + footer);
});

var port = process.env.PORT || 8087;
app.listen(port,function(){
    console.log("Listen on port "+ port);
});

