import React, { Component } from "react";
import { render } from "react-dom";
import ProductSelector from "./ProductSelector";
import BookConfirmationDialog from "./BookConfirmationDialog";

class BookDialog extends Component {
  constructor(props) {
    super(props);
	this.state = {
		confirmationDialogVisible: false,
		productId: null
	};

	this.handleChange = this.handleChange.bind(this);	
	this.handleSelectedProductChange = this.handleSelectedProductChange.bind(this);	
  }

  handleChange(event)
  {
    this.setState({confirmationDialogVisible: true});
  }
  
  handleSelectedProductChange(newProductId)
  {
	  this.setState({productId: newProductId});
  }

  render() {
	if (this.props.visible == false)
		return null;
	  
    return (
      <div>
        <ProductSelector value={this.state.productId} options={this.props.products} onChange={this.handleSelectedProductChange} />

		<input type="date" name="start_date" />
		<input type="date" name="end_date" />

		<input type="button" value="Cancel" />
		<input type="button" value="Book" />

		<BookConfirmationDialog visible={this.state.confirmationDialogVisible} estimated_price={1234} />
	  </div>
    );
  }
}

export default BookDialog;
