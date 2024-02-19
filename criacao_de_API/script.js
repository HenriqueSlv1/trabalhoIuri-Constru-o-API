document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&maxResults=10')
    .then(response => response.json())
    .then(data => {
        const livrosDiv = document.getElementById('livros');
        data.items.forEach(item => {
            const livroDiv = document.createElement('div');
            livroDiv.classList.add('livro');

            const titulo = document.createElement('h2');
            titulo.textContent = item.volumeInfo.title;
            livroDiv.appendChild(titulo);

            const autor = document.createElement('p');
            autor.textContent = 'Autor: ' + (item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Desconhecido');
            livroDiv.appendChild(autor);

            const descricao = document.createElement('p');
            descricao.textContent = 'Descrição: ' + (item.volumeInfo.description ? item.volumeInfo.description : 'Sem descrição disponível');
            livroDiv.appendChild(descricao);

            const imagem = document.createElement('img');
            imagem.src = (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) ? item.volumeInfo.imageLinks.thumbnail : 'sem-imagem-disponivel.png';
            imagem.alt = item.volumeInfo.title;
            livroDiv.appendChild(imagem);

            livrosDiv.appendChild(livroDiv);

            enviarLivroParaServidor(item.volumeInfo);
        });
    })
    .catch(error => console.error('Erro ao obter os dados:', error));
});
function enviarLivroParaServidor(livroInfo) {
    fetch('/adicionarLivro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livroInfo)
    })
    .then(response => response.json())
    .then(data => console.log('Livro adicionado ao arquivo dados.json:', data))
    .catch(error => console.error('Erro ao adicionar livro ao arquivo dados.json:', error));
}

