import React from 'react'
import BookItem from './BookItem';

export default function BookList({ name, books }) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <BookItem book={book} />
                    ))}
                </ol>
            </div>
        </div>
    )
}
