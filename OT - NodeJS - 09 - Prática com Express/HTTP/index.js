import Express from 'express';
const app = Express();

var carros = [
	{name:'Palio' ,      marca:'Fiat',           preco: 1000.00},
    {name:'Gol',     marca:'VW',          preco: 1800.00},
    {name:'i30',       marca:'Hyundai',        preco: 3199.99},
	{name:'HRV',    marca:'Hyundai',             preco: 8299.00},
    {name:'Jetta',     marca:'VW',     preco: 11299.00},
	{name:'Renegane',      marca:'Jeep',         preco: 13299.00},
];

app.use(Express.urlencoded({ extended: true}));

app.get('/', (req, res) =>
    res.send("<h3>Rotas no Express </h3><p>Rota '/'")
);

app.get('/sobre', (req, res) =>
    res.send("<h3>Rotas no Express</h3><p>Vamos aprender a utilizar Rotas com Express</p>")
);

app.get('/users/:name', (req, res) => {
    let name = req.params.name;
    return res.json({ name });
});

app.get('/cars', (req, res) => {
    return res.json(carros);
});

app.post('/cars/', (req, res) => {
    let name = req.body.name;
    let marca = req.body.marca;
    let preco = req.body.preco;

    let newCarro = {name, marca, preco}
    carros.push(newCarro);
    return res.json([carros[(carros.length -1)]]);
});

app.put('/cars/:id', (req, res) => {
    let name = req.body.name;
    let marca = req.body.marca;
    let preco = req.body.preco;

    carros[req.params.id] = {name, marca, preco};
    return res.json(carros[req.params.id]);
});

app.delete('/cars/:id', (req, res) => {
    let id = req.params.id;
    carros[id] = null;
    return res.json(carros[id]);
});

app.listen(3000, () =>
    console.log('Servidor iniciado na porta 3000')
);




