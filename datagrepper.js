#!/usr/bin/env node
var util = require('util');
var httpsync = require('httpsync');
var fs = require('fs');
var cheerio = require('cheerio');

var datasource = "datasource.json";

var loadSource = function(){
    return JSON.parse(fs.readFileSync(datasource));
}


var parseIdokep = function(result, order,id,name,places){
    if (result instanceof Error) {
	console.log('Error: ' + result.message);
    }else{
	$ = cheerio.load(result);
	// Parse each element
	lastcell = $('.beszamolo0').last();
	elem = lastcell.text().split('\n');
	wa = elem[3].trim();
	ws = elem[4].trim();
	var data = { 
	         order: order,
		 id: id, 
		 name: name,
		 windSpeed: ws,
		 windDir: wa
	};
	places.push(data);
	// console.log(data.name+"\t"+ws+"\t"+wa+"\n");
    }
}


getdata = function(){
var places = [];
var data = loadSource();

data.forEach(function(elem){
    var req = httpsync.get({url: "http://www.idokep.hu/automata/"+elem.id});
    var res = req.end();
    parseIdokep(res.data,elem.order,elem.id,elem.name,places);
});

return places;
}


exports.getData = getdata;

if(require.main == module){
    getdata();
}else{

}
