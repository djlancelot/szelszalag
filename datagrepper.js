#!/usr/bin/env node
var util = require('util');
var rest = require('restler');
var fs = require('fs');
var cheerio = require('cheerio');
var join = require('join');

var fns = join.create();

var places = [];

var datasource = "datasource.json";

var loadSource = function(){
    return JSON.parse(fs.readFileSync(datasource));
}

var buildFn = function(id, name,order, places,task){
    var callBack = fns.add();
    var parseIdokep = function(result){
	if (result instanceof Error) {
	    console.log('Error: ' + result.message);
	}else{
	    $ = cheerio.load(result);
	    // 
	    // Parse each element
	    lastcell = $('.beszamolo0').last();
	    elem = lastcell.text().split('\n');
	    wa = elem[3].trim();
	    ws = elem[4].trim();
	    var data = { order: order, 
			 id: id, 
			 name: name,
			 windSpeed: ws,
			 windDir: wa
		       };
	    places.push(data);
	    console.log(name+"\t"+ws+"\t"+wa+"\n");
	}
	//task.removeListener('complete',parseIdokep);
	callBack();
    }
    return parseIdokep;
}


var data = loadSource();
data.forEach(function(elem){
var task = rest.get('http://www.idokep.hu/automata/'+elem.id);
task.on('complete',
						   buildFn(elem.id,
							   elem.name,
							   elem.order,
							   places,task));
});

writedata = function(){
    console.log(places);    
}

fns.when(writedata);
