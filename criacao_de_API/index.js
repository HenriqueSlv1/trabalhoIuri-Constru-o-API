const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/adicionarLivro', (req, res) => {
    try {
        const dados = JSON.parse(fs.readFileSync('./data/dados.json', 'utf8'));
        
        const novoLivro = req.body;
        dados.Livros.push(novoLivro);
        fs.writeFileSync('./data/dados.json', JSON.stringify(dados, null, 2));
        
        res.status(200).json({ message: 'Livro adicionado com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar livro:', error);
        res.status(500).json({ error: 'Erro ao adicionar livro.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
