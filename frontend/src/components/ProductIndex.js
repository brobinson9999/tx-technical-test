import React, { Component } from "react";
import { render } from "react-dom";

import SearchBar from "./SearchBar";
import SortableListView from "./SortableListView";
import BookButton from "./BookButton";
import BookDialog from "./BookDialog";
import BookConfirmationDialog from "./BookConfirmationDialog";
import ReturnButton from "./ReturnButton";
import ReturnDialog from "./ReturnDialog";
import ReturnConfirmationDialog from "./ReturnConfirmationDialog";


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
    return (
	  <div>
	    <SearchBar value={this.state.search_query} onChange={this.handleChange} />

		<SortableListView items={this.props.products.filter(product => product.name.includes(this.state.search_query))} />

		<BookButton />
		<BookDialog />
		<BookConfirmationDialog />
		
		<ReturnButton />
		<ReturnDialog />
		<ReturnConfirmationDialog />
	  </div>
    );
  }
}

export default ProductIndex;
