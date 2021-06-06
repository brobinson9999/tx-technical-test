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
  }

  render() {
    return (
	  <div>
	    <SearchBar />

		<SortableListView items={this.props.products} />

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
