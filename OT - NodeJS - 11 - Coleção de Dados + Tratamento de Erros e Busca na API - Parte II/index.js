import express from 'express';
import colecaoUf from './dados.js';

const app = express();

app.get('/ufs', (req, res) => {
    res.json(colecaoUf);
});

app.get('/ufs/:iduf', (req, res) => {
    const idUF = parseInt(req.params.iduf);
    const uf = colecaoUf.find(u => u.id === idUF);
    res.json(uf);
});


app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});

