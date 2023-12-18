import express from 'express';
import colecaoGames from './games.js';

const app = express();
app.use(express.json());

const buscarPorNome = (nomeGame) => {
    return colecaoGames.filter(game => game.title.toLocaleLowerCase().includes(nomeGame.toLocaleLowerCase()));
};

app.get("/games", (req, res) => {
    const nomeGame = req.query.busca;
    const resultado = nomeGame ? buscarPorNome(nomeGame) : colecaoGames;
    if(resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro": "Nenhum game encontrado!"});
    };

});

app.get("/games/:idgame", (req, res) => {
    const idGame = parseInt(req.params.idgame);
    let mensagemErro = '';
    let game;
    
    if (!(isNaN(idGame))) {
        game = colecaoGames.find(g => g.id === idGame);
        if(!game) {
            mensagemErro = 'Jogo não encontrado';
        };
    } else {
        mensagemErro = 'Requisição inválida';
    };

    if (game) {
        res.json(game);
    } else {
        res.status(404).send({"erro": mensagemErro });
    };
});

app.post("/games/novogame", (req, res) => {
    let title = req.body.title;
    let studio = req.body.studio;
    let price = req.body.price 
    
    console.log(title);
    console.log(studio);
    console.log(price);

    let newGame = {title, studio, price};
    colecaoGames.push(newGame);
    res.send("OK");
});

app.put('/games/novogame/:idgame', (req, res) => {
    const idGame = parseInt(req.params.idgame);
    let mensagemErro = '';
    let index;
    let game;

    let id = idGame;
    let title = req.body.title;
    let studio = req.body.studio;
    let price = req.body.price;

    if (!(isNaN(idGame))) {
        game = colecaoGames.find(g => g.id === idGame);
        if(!game) {
            mensagemErro = 'Jogo não encontrado';
            return res.status(404).send({ "erro" : mensagemErro})
        } else {
            index = idGame - 1;
            colecaoGames[index] = {id, title, studio, price};
            return res.json(colecaoGames);
        };
    } else {
        mensagemErro = 'Requisição inválida';
        return res.status(404).send({"erro ": mensagemErro});
    };
});

app.delete("/games/:idgame", (req, res) => {
    const idGame = parseInt(req.params.idgame);
    
    if (idGame >= 1 && idGame < colecaoGames.length) {
        const index = idGame -1;
        colecaoGames.splice(index, 1);
        
        for (let i = index; i < colecaoGames.length; i++) {
            colecaoGames[i].id = i + 1;
        };
        return res.json({ message: "O Jogo foi deletado"});
    } else {
        return res.status(404).json({ "error": "Jogo não encontrado"});
    };
});

app.listen(3080,() => {
    console.log("Servidor rodando na porta 3080!");
});