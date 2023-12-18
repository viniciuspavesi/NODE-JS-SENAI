const express = require("express");
const app = express();
app.use(express.json());

let games = [
    {title: "Grand Theft Auto",   studio: "Rockstar Games",   price: 200.00},
    {title: "Grand Theft Auto 2",   studio: "Rockstar Games", price: 200.00},
    {title: "Grand Theft Auto III",   studio: "Rockstar Games", price: 200.00},
    {title: "Grand Theft Auto: Vice City",   studio: "Rockstar Games", price: 200.00},
    {title: "Grand Theft Auto: San Andreas",   studio: "Rockstar Games", price: 200.00},
    {title: "Grand Theft Auto IV",   studio: "Rockstar Games",          price: 200.00},
    {title: "Grand Theft Auto V",   studio: "Rockstar Games",          price: 200.00}
];

app.listen(3080,() => {
    console.log("Servidor rodando!");
});

app.get("/", (req, res) => {
    res.json(games);
});

app.post("/novogame", (req, res) => {
    let title = req.body.title;
    let time = req.body.epoca;
    let studio = req.body.studio;
    let price = req.body.price 
    
    console.log(title);
    console.log(time);
    console.log(studio);
    console.log(price);

    let newGame = {title, studio, studio, price};
    games.push(newGame);
    res.send("OK");
});



