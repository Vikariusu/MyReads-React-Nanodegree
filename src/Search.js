import React from 'react';
import * as BooksAPI from './BooksAPI'

import { Link } from 'react-router-dom';
import BookList from './BookList';

export default class Search extends React.Component {
    state = {
        searchValue: '',
        books: [],
        errorMessage: ''
    }

    handleChange = (searchValue) => {
        this.setState(() => ({ searchValue }), this.filterBooks)
    }

    filterBooks = async () => {
        const searchValue = this.state.searchValue.toLowerCase();
        if (!searchValue) {
            return this.setState({ books: [], errorMessage: '' });
        }

        try {
            const books = await BooksAPI.search(searchValue)

            if (books.error) {
                this.setState({ errorMessage: 'Your search did not match any books.', books: [] })
            } else {
                this.setState({ books });
            }
        } catch (err) {
            console.log(err);
        }
    }

    getBooksWithShelves = () => {
        return this.state.books.map((book) => {
            const bookInParentState = this.props.userBooks.find((userBook) => userBook.id === book.id)
            const shelf = bookInParentState ? bookInParentState.shelf : "none"

            return { shelf: shelf, ...book }
        })
    }

    render() {
        const booksWithShelf = this.getBooksWithShelves();

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>

                    <div className="search-books-input-wrapper">
                        {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.searchValue}
                            onChange={(e) => this.handleChange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.errorMessage}
                    <ol className="books-grid">
                        <BookList
                            books={booksWithShelf}
                            name="Search"
                            onShelfChange={this.props.onShelfChange}
                        />
                    </ol>
                </div>
            </div>
        )
    }
}