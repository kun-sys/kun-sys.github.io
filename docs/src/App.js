import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      autor: String,
      titulo: String
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let autor = document.getElementById('autor').value;
    let titulo = document.getElementById('titulo').value;
    if(autor === ""){
      autor = this.state.autor;
    }
    if(titulo === ""){
      titulo = this.state.titulo;
    }
    const url = `https://www.googleapis.com/books/v1/volumes?q=${autor}+intitle:${titulo}&maxResults=40`;
    axios.get(url)
      .then(response => {
        const books = response.data.items;
        this.setState({ books, autor, titulo });
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    const storedData = localStorage.getItem('myAppData');
    if (storedData) {
      this.setState(JSON.parse(storedData));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('myAppData', JSON.stringify(this.state));
  }

  render() {
    const { books, autor, titulo } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <p>Bienvenido a mi buscador de libro</p>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="autor">Autor:</label>
              <input type="text" id="autor" placeholder={autor ? `Autor actual: ${autor}` : "Introduzca el nombre del autor"} />
            </div>
            <div>
              <label htmlFor="titulo">Título:</label>
              <input type="text" id="titulo" placeholder={titulo ? `Titulo actual: ${titulo}` : "Introduzca el título del libro"} />
            </div>
            <button type="submit">Buscar</button>
          </form>
          <ul className="book-list">
            {books ? books.map(book => (
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
            )): (
              <li>No se encontraron libros</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
