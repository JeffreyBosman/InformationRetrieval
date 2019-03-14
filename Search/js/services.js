/*
 * Calaca - Search UI for Elasticsearch
 * https://github.com/romansanchez/Calaca
 * http://romansanchez.me
 * @rooomansanchez
 * 
 * v1.2.0
 * MIT License
 */

/* Service to Elasticsearch */

// "index": CALACA_CONFIGS.index_name,
//                 "type": CALACA_CONFIGS.type,
//                 "body": {
//                     "size": CALACA_CONFIGS.size,
//                     "from": offset,
//                     "query": {
//                         "bool": { 
//                             "must": [
//                               { "match": { "description":   query }}
//                             ],
//                             "filter": [{ "term" : { "location" : "london"}}]
//                           }
//                     }
//                 }

var cities = [
    {
      "City": "peterborough",
      "lat": 52.573921,
      "long": -0.25083
    },
    {
      "City": "elgin",
      "lat": 57.653484,
      "long": -3.335724
    },
    {
      "City": "stoke-on-trent",
      "lat": 53.002666,
      "long": -2.179404
    },
    {
      "City": "solihull",
      "lat": 52.412811,
      "long": -1.778197
    },
    {
      "City": "cardiff",
      "lat": 51.481583,
      "long": -3.17909
    },
    {
      "City": "eastbourne",
      "lat": 50.768036,
      "long": 0.290472
    },
    {
      "City": "oxford",
      "lat": 51.752022,
      "long": -1.257677
    },
    {
      "City": "london",
      "lat": 51.509865,
      "long": -0.118092
    },
    {
      "City": "swindon",
      "lat": 51.568535,
      "long": -1.772232
    },
    {
      "City": "gravesend",
      "lat": 51.441883,
      "long": 0.370759
    },
    {
      "City": "northampton",
      "lat": 52.240479,
      "long": -0.902656
    },
    {
      "City": "rugby",
      "lat": 52.370876,
      "long": -1.265032
    },
    {
      "City": "suttoncoldfield",
      "lat": 52.570385,
      "long": -1.824042
    },
    {
      "City": "harlow",
      "lat": 51.772938,
      "long": 0.10231
    },
    {
      "City": "aberdeen",
      "lat": 57.149651,
      "long": -2.099075
    },
    {
      "City": "swansea",
      "lat": 51.621441,
      "long": -3.943646
    },
    {
      "City": "chesterfield",
      "lat": 53.235046,
      "long": -1.421629
    },
    {
      "City": "londonderry",
      "lat": 55.006763,
      "long": -7.318268
    },
    {
      "City": "salisbury",
      "lat": 51.068787,
      "long": -1.794472
    },
    {
      "City": "manchester",
      "lat": 53.483959,
      "long": -2.244644
    },
    {
      "City": "weymouth",
      "lat": 50.614429,
      "long": -2.457621
    },
    {
      "City": "wolverhampton",
      "lat": 52.59137,
      "long": -2.110748
    },
    {
      "City": "preston",
      "lat": 53.765762,
      "long": -2.692337
    },
    {
      "City": "bournemouth",
      "lat": 50.720806,
      "long": -1.904755
    },
    {
      "City": "doncaster",
      "lat": 53.52282,
      "long": -1.128462
    },
    {
      "City": "ayr",
      "lat": 55.458565,
      "long": -4.629179
    },
    {
      "City": "hastings",
      "lat": 50.854259,
      "long": 0.573453
    },
    {
      "City": "bedford",
      "lat": 52.136436,
      "long": -0.460739
    },
    {
      "City": "basildon",
      "lat": 51.572376,
      "long": 0.470009
    },
    {
      "City": "chippenham",
      "lat": 51.458057,
      "long": -2.116074
    },
    {
      "City": "folkestone",
      "lat": 51.081398,
      "long": 1.169456
    },
    {
      "City": "belfast",
      "lat": 54.607868,
      "long": -5.926437
    },
    {
      "City": "uckfield",
      "lat": 50.967941,
      "long": 0.085831
    },
    {
      "City": "worthing",
      "lat": 50.825024,
      "long": -0.383835
    },
    {
      "City": "leeds",
      "lat": 53.801277,
      "long": -1.548567
    },
    {
      "City": "kendal",
      "lat": 54.328506,
      "long": -2.74387
    },
    {
      "City": "hull",
      "lat": 53.747372,
      "long": -0.338653
    },
    {
      "City": "plymouth",
      "lat": 50.376289,
      "long": -4.143841
    },
    {
      "City": "haverhill",
      "lat": 52.080875,
      "long": 0.444517
    },
    {
      "City": "frankton",
      "lat": 52.328415,
      "long": -1.377561
    },
    {
      "City": "inverness",
      "lat": 57.477772,
      "long": -4.224721
    },
    {
      "City": "cambridgeshire",
      "lat": 52.573921,
      "long": -0.25083
    },
    {
      "City": "scotland",
      "lat": 57.653484,
      "long": -3.335724
    },
    {
      "City": "staffordshire",
      "lat": 53.002666,
      "long": -2.179404
    },
    {
      "City": "birmingham",
      "lat": 52.412811,
      "long": -1.778197
    },
    {
      "City": "cardiff county",
      "lat": 51.481583,
      "long": -3.17909
    },
    {
      "City": "east sussex",
      "lat": 50.768036,
      "long": 0.290472
    },
    {
      "City": "oxfordshire",
      "lat": 51.752022,
      "long": -1.257677
    },
    {
      "City": "swindon",
      "lat": 51.568535,
      "long": -1.772232
    },
    {
      "City": "northamptonshire",
      "lat": 52.240479,
      "long": -0.902656
    },
    {
      "City": "warwickshire",
      "lat": 52.370876,
      "long": -1.265032
    },
    {
      "City": "essex",
      "lat": 51.772938,
      "long": 0.10231
    },
    {
      "City": "aberdeen city",
      "lat": 57.149651,
      "long": -2.099075
    },
    {
      "City": "swansea",
      "lat": 51.621441,
      "long": -3.943646
    },
    {
      "City": "derbyshire",
      "lat": 53.235046,
      "long": -1.421629
    },
    {
      "City": "derry",
      "lat": 55.006763,
      "long": -7.318268
    },
    {
      "City": "dorset",
      "lat": 50.614429,
      "long": -2.457621
    },
    {
      "City": "west midlands",
      "lat": 52.59137,
      "long": -2.110748
    },
    {
      "City": "lancashire",
      "lat": 53.765762,
      "long": -2.692337
    },
    {
      "City": "south yorkshire",
      "lat": 53.52282,
      "long": -1.128462
    },
    {
      "City": "south ayrshire",
      "lat": 55.458565,
      "long": -4.629179
    },
    {
      "City": "wiltshire",
      "lat": 51.458057,
      "long": -2.116074
    },
    {
      "City": "kent",
      "lat": 51.081398,
      "long": 1.169456
    },
    {
      "City": "west sussex",
      "lat": 50.825024,
      "long": -0.383835
    },
    {
      "City": "west yorkshire",
      "lat": 53.801277,
      "long": -1.548567
    },
    {
      "City": "cumbria",
      "lat": 54.328506,
      "long": -2.74387
    },
    {
      "City": "suffolk",
      "lat": 52.080875,
      "long": 0.444517
    }
  ];

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

Calaca.factory('calacaService', ['$q', 'esFactory', '$location', function($q, elasticsearch, $location){

    //Set default url if not configured
    CALACA_CONFIGS.url = (CALACA_CONFIGS.url.length > 0)  ? CALACA_CONFIGS.url : $location.protocol() + '://' +$location.host() + ":9200";

    var client = elasticsearch({ host: CALACA_CONFIGS.url });

    var latitude, longitude;

    //get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        console.log("Geolocation is not supported by this browser.");
      }
    
      function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
        latitude = position.coords.latitude;
        longitude= position.coords.longitude;
      }

    var search = function(query, distance, mode, offset){

        var deferred = $q.defer();

        if (query.length == 0) {
            deferred.resolve({ timeTook: 0, hitsCount: 0, hits: [] });
            return deferred.promise;
        }

        // console.log(cities);
        console.log(distance);
        console.log("Latitude: " + latitude + " Longitude: " + longitude);
        var selectedCities = [];
        for(var key in cities){
            // console.log("City: " + cities[key].City + " lat:" + cities[key].lat + " long: " + cities[key].long);
            var distanceToCity = getDistanceFromLatLonInKm(latitude, longitude, cities[key].lat, cities[key].long);
            if(distance >= distanceToCity){
                selectedCities.push(cities[key].City);
            }
        }
        console.log(selectedCities);
        // if(distance == undefined || distance == ""){
        //     locationFilter = [];
        // }else{
        //     locationFilter = [{ "term":  { "location": distance }}];
        // }

        client.search({
                "index": CALACA_CONFIGS.index_name,
                "type": CALACA_CONFIGS.type,
                "body": {
                    "size": CALACA_CONFIGS.size,
                    "from": offset,
                    "query": {
                        "bool": { 
                            "must": [
                              { "match": { "description":   query }}
                            ],
                            "filter": [{ "term" : { "location" : "london"}}]
                          }
                    }
                }
        }).then(function(result) {

                var i = 0, hitsIn, hitsOut = [], source;
                hitsIn = (result.hits || {}).hits || [];
                for(;i < hitsIn.length; i++){
                    source = hitsIn[i]._source;
                    source._id = hitsIn[i]._id;
                    source._index = hitsIn[i]._index;
                    source._type = hitsIn[i]._type;
                    source._score = hitsIn[i]._score;
                    hitsOut.push(source);
                }
                deferred.resolve({ timeTook: result.took, hitsCount: result.hits.total, hits: hitsOut });
        }, deferred.reject);

        return deferred.promise;
    };

    return {
        "search": search
    };

    }]
);
