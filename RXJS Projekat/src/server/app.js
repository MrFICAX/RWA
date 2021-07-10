// import express, { json } from "express";
// import { response } from "express";
//import foo from '../../movies-db.json';
//import foo from '../../movies-db.json';
const fs = require('fs');
const express = require('express');


const app = express();
//import cors from 'cors';
const cors = require('cors');
const port = 3000;

app.use(cors({
    origin: ['http://127.0.0.1:5501', 'http://127.0.0.1:3000']
}));

app.use('/', (req, res, next) => {
    var data = ''
    res.on('data', chunk => { data+=chunk })
    res.on('end', () => {
      console.log(data)
    })
  
    next()
  })


//   function GetStudentsJson() {
//     return  readJSONFile('movies-db.json', function (err, json) {
//         if(err) 
//             { throw err; }  
//         return json;
//     });
//   }

app.get('/', (request, response) => { //http://localhost:3000/ ruta za poziv ove metode
    response.send("Hello world RWA");
    let fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    console.log(fullUrl);


});

app.get('/drivers/:carName?', (request, response) => { //http://localhost:3000/products/3 ruta za poziv ove metode
    var newArray;
    const Parameters = request.params;
    let fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    console.log(Parameters.carName);
    const CarInput = Parameters.carName;
    console.log(CarInput);
    readJSONFile('taxi_drivers.json', function (err, json) {
                if(err) 
                    { throw err; }  

                var drivers = json.drivers;
               // console.log(drivers);
                newArray = drivers.filter(function (el)
                    {
                      console.log(CarInput);
                      console.log(el.car);

                        return el.car == CarInput;
                    }
                );
            response.send(newArray);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

//------------------------------------------
//READ FROM JSON FILE
function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
        console.log("ERROR WHILE READING");
      callback(err);
      return;
    }
    try {
        console.log("STARTED TO READ");
      callback(null, JSON.parse(data));
    } catch(exception) {
        console.log("EXCEPTION WHILE READING");
      callback(exception);
    }
  });
}
