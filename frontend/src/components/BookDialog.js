import React, { Component } from "react";
import { render } from "react-dom";
import ProductSelector from "./ProductSelector";
import BookConfirmationDialog from "./BookConfirmationDialog";

class BookDialog extends Component {
  constructor(props) {
    super(props);
	this.state = {
		confirmationDialogVisible: false,
		productId: -1, // Used to be null but it caused warnings
		start_date: "",
		end_date: ""
	};

	this.showConfirmationDialog = this.showConfirmationDialog.bind(this);	
	this.cancelConfirmationDialog = this.cancelConfirmationDialog.bind(this);	
	this.confirmConfirmationDialog = this.confirmConfirmationDialog.bind(this);	

	this.handleInputChange = this.handleInputChange.bind(this);	
  }

  showConfirmationDialog(event)
  {
    this.setState({confirmationDialogVisible: true});
  }
  
  cancelConfirmationDialog(event)
  {
    this.setState({confirmationDialogVisible: false});
  }

  confirmConfirmationDialog(event)
  {
    this.setState({confirmationDialogVisible: false});

	const booking = {
		product_id: this.state.productId,
		start_date: this.state.start_date,
		end_date: this.state.end_date
	};
	
	fetch('/api/booking/', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(booking),
	}).then(() => {
		this.props.onConfirm(event);
	});
  }

  handleInputChange(event) {
	const target = event.target;
	const value = target.type === 'checkbox' ? target.checked : target.value;
	const name = target.name;
	this.setState({
	  [name]: value
	});
  }
  
  render() {
	if (this.props.visible == false)
		return null;
	
	var price = 0;
	
	var product = null;
	for (var i=0;i<this.props.products.length;i++)
	{
		if (this.props.products[i].id == this.state.productId)
		{
			product = this.props.products[i];
		}
	}
	
	var validBooking = (product != null 
	    && this.state.start_date != ""
		&& this.state.end_date != "");
		
	if (validBooking)
	{
		const millisecondsPerDay = (1000 * 3600 * 24);

		const endDate = new Date(this.state.end_date);
		const startDate = new Date(this.state.start_date);

		var rentalPeriod = (endDate.getTime() - startDate.getTime()) / millisecondsPerDay;
		// When start date = end date, the rental period is 1 day.
		rentalPeriod += 1;
		
		if (rentalPeriod < product.minimum_rent_period)
		{
			validBooking = false;
		} else {
			const pricePerDay = product.price;
			price = rentalPeriod * pricePerDay;
			
			// According to the docs, there is supposed to be a discount logic, however the input data has no relevant properties for calculating it.
			// There is also supposed to be a "meter" type estimation, but again there is no price per mile on the input data.
		}
	}
	
    return (
      <div>
        <ProductSelector name="productId" value={this.state.productId} options={this.props.products} onChange={this.handleInputChange} />

		<input type="date" name="start_date" value={this.state.start_date} onChange={this.handleInputChange} />
		<input type="date" name="end_date" value={this.state.end_date} onChange={this.handleInputChange} />

		<input type="button" value="Cancel" onClick={this.props.onCancel} />
		<input type="button" value="Book" disabled={!validBooking} onClick={this.showConfirmationDialog} />

		<BookConfirmationDialog visible={this.state.confirmationDialogVisible} estimated_price={price} onCancel={this.cancelConfirmationDialog} onConfirm={this.confirmConfirmationDialog} />
	  </div>
    );
  }
}

export default BookDialog;
