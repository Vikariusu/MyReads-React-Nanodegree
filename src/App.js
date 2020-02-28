import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';

import BookList from './BookList';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.fetchAllBooks()
  }

  fetchAllBooks = () => {
    BooksAPI.getAll()
      .then(books => this.setState({ books }))
  }

  filterBooks = (shelfName) => {
    return this.state.books.filter(book => book.shelf === shelfName)
  }

  // move book to a different shelf
  onShelfChange = async (book, shelfName) => {
    await BooksAPI.update(book, shelfName)

    this.fetchAllBooks();
  }

  render() {
    return (
      <div className="app">
        <Route path="/search">
          <Search />
        </Route>

        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookList
                  name="Currently Reading"
                  books={this.filterBooks('currentlyReading')}
                  onShelfChange={this.onShelfChange}
                />
                <BookList name="Want to Read"
                  books={this.filterBooks('wantToRead')}
                  onShelfChange={this.onShelfChange} />
                <BookList
                  name="Read"
                  books={this.filterBooks('read')}
                  onShelfChange={this.onShelfChange}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        </Route>
      </div>
    )
  }
}

export default BooksApp
