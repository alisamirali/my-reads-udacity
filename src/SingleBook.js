import React, { Component  } from 'react';
import Author from "./Author";
import * as BooksAPI from "./BooksAPI";
import PropTypes from 'prop-types';
class SingleBook extends Component {
    
    _isMounted = false;
    static propTypes = {
        book: PropTypes.object.isRequired,
        UpdateBooks: PropTypes.func.isRequired
    }
    state = {
        shelf: ''
    }
    handleSelectChange = (value, book) => {
         BooksAPI.update(book, value)
        .then((shelf) => {
            this.setState({shelf:value});
            this.props.UpdateBooks(shelf, book);
        })
    }
    componentDidMount() {
        this._isMounted = true;
        BooksAPI.get(this.props.book.id)
            .then(({shelf}) => {
                if (this._isMounted) {
                    this.setState({shelf:shelf});
                }
            })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        let {book} = this.props;
        const shelf = this.state.shelf;
        //define cover of the book, if image exists we put the image, else we put the white color as background
        const background = book.imageLinks ? `url(${book.imageLinks.thumbnail})` : `#fff`
        return(
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, background: background}}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(event) => this.handleSelectChange(event.target.value, book)} value={shelf} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {
                        book.authors && book.authors.map(author => ( <Author authoName={author} key={author} />))
                    }
                </div>
            </li>
        )
    }
}

export default SingleBook;




