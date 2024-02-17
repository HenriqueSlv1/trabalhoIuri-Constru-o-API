const dados = require('./data/dados.json')
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

server.listen(3000, () => {
    console.log("O servidor está rodando");
});


server.post('/livros', (req, res) => {
    const novoLivro = req.body;

    if (!novoLivro.id || !novoLivro.nome || !novoLivro.autor) {
        return res.status(400).json({ mensagem: "Dados insuficientes, tente novamente" });
    } else {
        dados.Livros.push(novoLivro);
        salvarDados(dados);

        return res.status(201).json({ mensagem: "Dados completos" });
    }
});

server.get('/livros', (req, res) => {
    return res.json(dados.Livros);
});


server.put('/livros/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    const atualizarLivros = req.body;

    const indiceLivro = dados.Livros.findIndex(livros => livros.id === livroId);

    if (indiceLivro === -1) { // Verifica se o livro foi encontrado corretamente
        return res.status(404).json({ mensagem: 'Livro não encontrado' });
    }

    dados.Livros[indiceLivro].nome = atualizarLivros.nome || dados.Livros[indiceLivro].nome;
    dados.Livros[indiceLivro].autor = atualizarLivros.autor || dados.Livros[indiceLivro].autor;

    salvarDados(dados);
    return res.json({ mensagem: 'Livro atualizado!', dados: dados.Livros[indiceLivro] });
});

server.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    dados.Livros = dados.Livros.filter(l => l.id !== id);

    salvarDados(dados);
    return res.status(200).json({ mensagem: "Usuário excluido com sucesso."});
});

function salvarDados(){
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}

