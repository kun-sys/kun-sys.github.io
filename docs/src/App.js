import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const autor = document.getElementById('autor').value;
    const titulo = document.getElementById('titulo').value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${autor}+intitle:${titulo}&maxResults=40`;
    axios.get(url)
      .then(response => {
        const books = response.data.items;
        this.setState({ books });
      })
      .catch(error => console.error(error));
  }
  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Bienvenido a mi buscador de libro</p>
        </header>
        <body>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="autor">Autor:</label>
              <input type="text" id="autor" placeholder="Introduzca el nombre del autor" />
            </div>
            <div>
              <label htmlFor="titulo">Título:</label>
              <input type="text" id="titulo" placeholder="Introduzca el título del libro" />
            </div>
            <button type="submit">Buscar</button>
          </form>
          <ul className="book-list">
            {books.map(book => (
              <li key={book.id}>
                <div className="book-info">
                  <div className="book-cover">
                    <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""} alt="Portada del libro"/>
                  </div>
                  <div className="book-details">
                    <h3>{book.volumeInfo.title}</h3>
                    <p><strong>Autor:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}</p>
                    <p><strong>Fecha de publicación:</strong> {book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "Desconocida"}</p>
                    <p><strong>Puntuación:</strong> {book.volumeInfo.averageRating ? book.volumeInfo.averageRating + "/5" : "Sin calificar"}</p>
                    <div className="url-container">
                      <p><strong>URL:</strong></p>
                      <a href={book.volumeInfo.previewLink} className="url">{book.volumeInfo.previewLink}</a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </body>
      </div>
    );
  }
}

export default App;
