import React, { Component } from "react";
import { render } from "react-dom";

import SearchBar from "./SearchBar";
import SortableListView from "./SortableListView";
import BookButton from "./BookButton";
import ReturnButton from "./ReturnButton";


class ProductIndex extends Component {
  constructor(props) {
    super(props);
	this.state = {
		search_query: ""
	};
	
	this.handleChange = this.handleChange.bind(this);	
  }

  handleChange(event)
  {
    this.setState({search_query: event.target.value});
  }

  render() {
	var products = this.props.products.filter(product => product.name.includes(this.state.search_query));
	
    return (
	  <div>
	    <SearchBar value={this.state.search_query} onChange={this.handleChange} />

		<SortableListView items={products} />

		<BookButton products={products} onChange={this.props.onChange} />
		<ReturnButton products={products} bookings={this.props.bookings} onChange={this.props.onChange} />
	  </div>
    );
  }
}

export default ProductIndex;
