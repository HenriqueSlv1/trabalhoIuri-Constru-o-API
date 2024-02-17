const booksForm = document.getElementById("books-form");
const booksList = document.getElementById("books-list");

function listBooks() {
    fetch('http://localhost:3000/livros')
        .then(response => response.json())
        .then(data => {
            booksList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `${book.nome} - autor: ${book.autor}, id: ${book.id}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deleteBook(book.id));
                li.appendChild(deleteButton);
                booksList.appendChild(li);
            });
        })
        .catch(error => console.log("Erro", error));
}


booksForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const autor = document.getElementById('autor').value;
    const id = document.getElementById('id').value;


    fetch('http://localhost:3000/livros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nome, autor: autor, id: id }),
    })
        .then(response => response.json())
        .then(() => {
            listBooks()
            booksForm.reset();
        })
        .catch(error => console.error('Erro:', error));
});


function deleteBook(book) {
    fetch(`/livros/${book.id}`, {
        method: 'DELETE',
    })
    .then(() => {
        listBooks(); // Aqui deve ser listBooks() em vez de listUsers()
    })
    .catch(error => console.error('Erro:', error));
}




listBooks() 