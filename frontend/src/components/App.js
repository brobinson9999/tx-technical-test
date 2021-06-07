import React, { Component } from "react";
import { render } from "react-dom";
import ProductIndex from "./ProductIndex";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  bookings: [],
      products: [],
      loaded: false,
      placeholder: "Loading"
    };
	
	this.reloadProductsAndBookings = this.reloadProductsAndBookings.bind(this);	
  }

  reloadProductsAndBookings() {
    fetch("api/product")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            products: data,
            loaded: true
          };
        });
      });

	// Loading this concurrently - you could also have it chain from the product loader.
    fetch("api/booking")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            bookings: data,
            loaded: true
          };
        });
      });
  }

  componentDidMount() {
	  this.reloadProductsAndBookings();
  }

  render() {
    return (
	  <ProductIndex products={this.state.products} bookings={this.state.bookings} onChange={this.reloadProductsAndBookings}/>      
    );
  }
}


export default App;

const container = document.getElementById("app");
render(<App />, container);