# Szelszalag Wind Integrator

## What is it?

Szelszalag is a node.js module that parses the Hungarian idokep.hu weather site's online database 
and lists the specified wind stations on one page. 

## What is it good for?

With this application you can collect multiple wind data in an array or a single web page (web.js). 
It is very good for sailors or surfers of lake Balaton.

## How does it work?

You need to configure datagrepper.json file (name and id parameters required) like this:
```
[
  {
      "order" : 0,
      "id" : "Globusz",
      "name":"Balatonfured",
      "side":"E"
  },
  {
      "order" : 15,
      "id": "keszthely",
      "name": "Keszthely",
      "side": "E"
  }
]
```

After calling .getData() function of datagrepper.js the function parses and returns the wind data in an array.
```
var wind = require("./datagrepper.js");
var result = wind.getData();
```
Each element will have a .name, a .windDir and a .windSpeed attribute with the trimmed text from the idokep.hu 
website. 

The given id in the json file is the name of the weather station, the ID in  http://www.idokep.hu/automata/ID 
( balatonkenese in http://www.idokep.hu/automata/balatonkenese ). Name can be any human readable name.
