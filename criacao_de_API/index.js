const dados = require('./data/dados.json')
const express = require('express')
const fs = require('fs')

const server = express()
server.use(express.json())

server.listen(3000, () => {
    console.log("o servidor está rodando")
})

server.post('/Livros', (req, res) => {
    const novoLivro = req.body;
    if (!novoLivro.nome || !novoLivro.autor) {
        return res.status(400).send({ erro: 'Dados insuficientes, tente novamente' });
    } else {
        dados.Livros.push(novoLivro);
        salvarDados(dados, __dirname + '/data/dados.json');
        return res.status(201).json({ mensagem: "Dados completos" });
    }
});

server.put('/Livros/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    const atualizarLivros = req.body;

    const livroExiste = dados.Livros.findIndex(livro => livro.id === livroId);

    if (livroExiste === -1) {
        return res.status(400).json({ erro: "Livro com este ID não encontrado" });
    }

    dados.Livros[livroExiste].nome = atualizarLivros.nome || dados.Livros[livroExiste].nome;
    dados.Livros[livroExiste].autor = atualizarLivros.autor || dados.Livros[livroExiste].autor;

    salvarDados(dados, __dirname + '/data/dados.json');
    return res.json({ mensagem: 'Livro atualizado!', dados: dados.Livros[livroExiste] });
});

server.delete('/livros/:id', (req, res) => {
    const livroIdexcluir = parseInt(req.params.id);
    
    dados.Livros = dados.Livros.filter((livro) => livro.id !== livroIdexcluir);
    
    salvarDados(dados, __dirname + 'data/dados.json');
    return res.status(200).json({ mensagem: "Livro excluído" });
});


server.get('/livros/:id', (req, res) => {
    return res.json(dados.Livros)
})
