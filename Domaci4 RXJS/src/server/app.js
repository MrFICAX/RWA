const express = require("express");
const { response } = require("express");

const app = express();
const port = 3000;

// app.get('/', (request, response) => { //http://localhost:3000/ ruta za poziv ove metode
//     response.send("Hello world RWA");
// });

app.get('/products/:id?', (request, response) => { //http://localhost:3000/products/3 ruta za poziv ove metode
    const productId = request.params.id;
    const MovieList = request.params
    response.send(`Product with id = ${productId}`)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
