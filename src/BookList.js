import React from 'react'
import BookItem from './BookItem';

export default function BookList({ name, books, onShelfChange }) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.length === 0 ? <div>There are no books in this category</div>
                        : books.map(book => (
                            <BookItem book={book} onShelfChange={onShelfChange} key={book.id} />
                        ))}
                </ol>
            </div>
        </div>
    )
}
