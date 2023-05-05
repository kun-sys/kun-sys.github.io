import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      autor: String,
      titulo: String,
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let autor = document.getElementById('autor').value;
    let titulo = document.getElementById('titulo').value;
    let q = "";
    if(autor === "" && titulo === ""){
        alert("Introduzca un autor o un titulo");
        return;
    }
    if(autor !== ""){
      q=`inauthor:${autor}`;
    }
    if(autor !== "" && titulo !==""){
      q+="+";
    }
    if(titulo !== ""){
      q+=`intitle:${titulo}`;
    }
    let url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=40`;

    this.setState({ loading: true });

    axios.get(url)
      .then(response => {
        const books = response.data.items;
        this.setState({ books, autor, titulo, loading:false });
      })
      .catch(error => console.error(error));
  }

  handleBookClick(url) {
    window.open(url);
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
    const { books, autor, titulo, loading } = this.state;
    return (
      <div className="App">
        <div className="App-header">
        <table>
            <tr>
                <td><img src="https://cdn-icons-png.flaticon.com/512/2702/2702154.png" width="40" alt="website icon"/></td>
                <td>Bienvenido a mi buscador de libro</td>
            </tr>
        </table>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="autor">Autor:</label>
              <input type="text" id="autor" placeholder={autor!=="" ? `Autor actual: ${autor}` : "Introduzca el nombre del autor"} />
            </div>
            <div>
              <label htmlFor="titulo">Título:</label>
              <input type="text" id="titulo" placeholder={titulo!=="" ? `Titulo actual: ${titulo}` : "Introduzca el título del libro"} />
            </div>
            <button type="submit">
                <table>
                    <tr>
                        <td><img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" class="mg-r-5" width="20" alt="search icon"/></td>
                        <td>Buscar</td>
                    </tr>
                </table>
            </button>
          </form>
          <div>
            {loading ? (
              <div class="center loader"></div>
            ) : (
              <ul className="book-list">
                  {books ? books.map(book => (
                    <li key={book.id} onClick={() => this.handleBookClick(book.volumeInfo.previewLink)}>
                      <div className="book-info">
                        <div className="book-cover">
                          <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""} alt="Portada del libro"/>
                        </div>
                        <div className="book-details">
                          <h3>{book.volumeInfo.title}</h3>
                          <p><strong>Autor:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}</p>
                          <p><strong>Fecha de publicación:</strong> {book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "Desconocida"}</p>
                          <p><strong>Puntuación:</strong> {book.volumeInfo.averageRating ? book.volumeInfo.averageRating + "/5" : "Sin calificar"}</p>
                        </div>
                      </div>
                    </li>
                  )): (
                    <div>
                      <p>No se encontraron libros</p>
                      <img src="https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg" alt="alternatetext"/>
                    </div>
                  )}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
