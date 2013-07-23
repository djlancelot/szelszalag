var util = require('util');
var rest = require('restler');
var fs = require('fs');
var cheerio = require('cheerio');

var places = [];

var datasource = "datasource.json";

var loadSource = function(){
    return JSON.parse(fs.readFileSync(datasource));
}

var buildFn = function(id, name,order, places){
    var parseIdokep = function(result){
	if (result instanceof Error) {
	    console.log('Error: ' + result.message);
	}else{
	    $ = cheerio.load(result);
	    // 
	    // Parse each element
	    lastcell = $('.beszamolo0').last();
	    elem = lastcell.text().split('\n');
	    wa = elem[3];
	    ws = elem[4];
	    var data = { order: order, 
			 id: id, 
			 name: name,
			 windSpeed: ws,
			 windDir: wa
		       };
	    places.push(data);
	    console.log(name+"\t"+ws+"\t"+wa+"\n");
	}
    }
    return parseIdokep;
}



parsePage = function(result){
    if (result instanceof Error) {
	console.log('Error: ' + result.message);
    }else{
	$ = cheerio.load(result);
	// 
	// Parse each element
	lastcell = $('.beszamolo0').last();
	elem = lastcell.text().split('\n');
	console.log(elem[3]);
	console.log(elem[4]);	
    }

}


var data = loadSource();
data.forEach(function(elem){
rest.get('http://www.idokep.hu/automata/'+elem.id).on('complete',
						   buildFn(elem.id,
							   elem.name,
							   elem.order,
							   places));
});
console.log(places.length);
