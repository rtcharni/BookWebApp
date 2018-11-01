import React, { Component } from "react";
import Footer from "./Footer";
// import data from "../data.json";
import BookComp from "./BookComp";
import Pagination from "./Pagination";
import { getBooksFromApi } from "../service";

var foundBooks;
var elements = [];

class BooksMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      current: 1,
      searchMode: false,
      update: false
    };
  }

  componentDidMount() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    getBooksFromApi(data => {
      console.log("DATA");
      console.log(data);
      this.setState({ books: data }, this.pushDataToPages);
    });
  }

  pushDataToPages() {
    elements = [];
    let counter = 1;
    for (let i = 0; i < this.state.books.length; i++) {
      if (this.state.books[i].id % 4 === 0) {
        elements.push(
          <BookComp book={this.state.books[i]} key={this.state.books[i].id} />
        );
        elements.push(
          <Pagination
            activePage={counter}
            pageOne={this.pageOne}
            pageTwo={this.pageTwo}
            pageThree={this.pageThree}
            pageFour={this.pageFour}
          />
        );
        counter++;
      } else if (i - 1 === this.state.books.length) {
        elements.push(
          <BookComp book={this.state.books[i]} key={this.state.books[i].id} />
        ); // Not sure if this is working!
        elements.push(
          // If last book, add last pagination page!
          <Pagination
            activePage={counter}
            pageOne={this.pageOne}
            pageTwo={this.pageTwo}
            pageThree={this.pageThree}
            pageFour={this.pageFour}
          />
        );
      } else {
        elements.push(
          <BookComp book={this.state.books[i]} key={this.state.books[i].id} />
        );
      }
    }
    console.log(elements);
    console.log(this.state.books);
    this.setState({ update: !this.state.update });
  }

  findBook = () => {
    if (!this.refs.search.value.length) {
      this.setState({ searchMode: false });
    } else {
      let tempBooks = [];
      let searchValue = this.refs.search.value.toLowerCase();
      this.state.books.forEach(element => {
        if (element.name.toLowerCase().includes(searchValue)) {
          tempBooks.push(element);
        }
      });
      foundBooks = tempBooks.map(value => {
        return <BookComp book={value} key={value.id} />;
      });
      this.setState({ searchMode: true });
    }
  };

  showAllBooks = () => {
    this.refs.search.value = "";
    this.setState({ searchMode: false });
  };

  pageOne = () => {
    this.setState({ current: 1 });
  };
  pageTwo = () => {
    this.setState({ current: 2 });
  };
  pageThree = () => {
    this.setState({ current: 3 });
  };
  pageFour = () => {
    this.setState({ current: 4 });
  };

  render() {
    return (
      <div className="container mt-3">
        <div class="input-group mb-1">
          <div class="input-group-prepend">
            <span class="input-group-text" id="search">
              Search
            </span>
          </div>
          <input
            onChange={this.findBook}
            ref="search"
            type="text"
            class="form-control"
            style={{ maxWidth: "350px" }}
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        <button onClick={this.showAllBooks} class="btn btn-primary mt-2">
          Show all books{" "}
          <span class="badge badge-light">{this.state.books.length}</span>
        </button>

        {!this.state.searchMode &&
          this.state.current === 1 &&
          elements.slice(0, 5)}
        {!this.state.searchMode &&
          this.state.current === 2 &&
          elements.slice(5, 10)}
        {!this.state.searchMode &&
          this.state.current === 3 &&
          elements.slice(10, 15)}
        {!this.state.searchMode &&
          this.state.current === 4 &&
          elements.slice(15, 20)}
        {this.state.searchMode && foundBooks}

      </div>
    );
  }
}

export default BooksMain;
