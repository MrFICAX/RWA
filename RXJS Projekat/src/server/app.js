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
const location = 'D://ELFAK Filip//VI SEMESTAR//Razvoj Web aplikacija//Repozitorijum//RWA//RXJS Projekat//pictures//';


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

app.get('/drivers/:carName?', (request, response) => { //http://localhost:3000/<naziv_automobila> ruta za poziv ove metode
    var newArray;
    const Parameters = request.params;
    //let fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    //console.log(Parameters.carName);
    const CarInput = Parameters.carName;
    console.log(CarInput);
    readJSONFile('taxi_drivers.json', function (err, json) {
                if(err) 
                    { throw err; }  

                var drivers = json.drivers;
               // console.log(drivers);
                newArray = drivers.filter(function (el)
                    {
                      return el.car === CarInput;
                    }
                );
            response.send(newArray);
        });
});

app.get('/photos/:carName?', (request, response) => { //http://localhost:3000/products/3 ruta za poziv ove metode
  var newArray;
  const Parameters = request.params;
  //let fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
  const CarInput = Parameters.carName;

  var files = fs.readdirSync(location + CarInput);
  files.forEach((element, index) => {
    const x = "pictures//" + CarInput +"//"+ element;
    console.log(x);
    files[index] = x;
  })
  console.log(files);
  response.send(files);

});

app.get('/cars', (request, response) => { //http://localhost:3000/products/3 ruta za poziv ove metode
  const newArray = [];
  const Parameters = request.params;
  let fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;

  readJSONFile('taxi_drivers.json', function (err, json) {
              if(err) 
                  { throw err; }  

              var drivers = json.drivers;
              drivers.forEach(element => {
                newArray.push(element.car);
              });
              //console.log(newArray);
              let uniqueChars = [...new Set(newArray)]; //spread operator zadrzava stanje niza i dodaje (Niz)Set sa novim automobilima

            console.log(uniqueChars);  
            //   newArray.filter((item, pos) => {
            //     newArray.indexOf(item) == pos;
            // })
            //   console.log(newArray);
          response.send(uniqueChars);
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
        console.log("GRESKA PRILIKOM CITANJA");
      callback(err);
      return;
    }
    try {
        console.log("POCINJEM DA CITAM PODATKE");
      callback(null, JSON.parse(data));
    } catch(exception) {
        console.log("EXCEPTION PRILIKOM CITANJA");
      callback(exception);
    }
  });
}
