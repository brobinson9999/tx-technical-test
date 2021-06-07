import React, { Component } from "react";
import { render } from "react-dom";
import ProductSelector from "./ProductSelector";
import ReturnConfirmationDialog from "./ReturnConfirmationDialog";

class ReturnDialog extends Component {
  constructor(props) {
    super(props);
	this.state = {
		confirmationDialogVisible: false,
		productId: -1, // Used to be null but it caused warnings
		used_mileage: ""
	};

	this.getProduct = this.getProduct.bind(this);	
	this.getBooking = this.getBooking.bind(this);	

	this.showConfirmationDialog = this.showConfirmationDialog.bind(this);	
	this.cancelConfirmationDialog = this.cancelConfirmationDialog.bind(this);	
	this.confirmConfirmationDialog = this.confirmConfirmationDialog.bind(this);	

	this.handleInputChange = this.handleInputChange.bind(this);	
  }

  getProduct()
  {
	var product = null;
	for (var i=0;i<this.props.products.length;i++)
	{
		if (this.props.products[i].id == this.state.productId)
		{
			product = this.props.products[i];
		}
	}
	return product;
  }

  getBooking()
  {
	var booking = { start_date: "2020-06-06" };
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
	
	// Update booking.returned_at.
    var booking = this.getBooking();
	booking.returned_at = new Date();

	// Update product.mileage and product.durability.
	var product = this.getProduct();
	product.mileage += this.state.used_mileage;
	// Might want to cap this at 0, and possibly set needs_to_repair when it hits 0.
	if (product.type == "plain")
	{
		product.durability -= rentalPeriod * 1;
	} else if (product.type == "meter")
	{
		product.durability -= (rentalPeriod * 2) + (2 * (this.state.used_mileage / 10));
	} else {
		throw 'Unrecognized product type!'
	}

	
	this.props.onConfirm(event);
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
	
	var booking = { start_date: "2020-06-06" };
	
	var validReturn = (product != null && booking != null);
		
	if (validReturn)
	{
		const millisecondsPerDay = (1000 * 3600 * 24);

		const endDate = new Date();
		const startDate = new Date(booking.start_date);

		var rentalPeriod = (endDate.getTime() - startDate.getTime()) / millisecondsPerDay;
		// When start date = end date, the rental period is 1 day.
		rentalPeriod += 1;
		
		if (rentalPeriod < product.minimum_rent_period)
		{
			validReturn = false;
		} else {
			const pricePerDay = product.price;
			price = rentalPeriod * pricePerDay;
			
			// According to the docs, there is supposed to be a discount logic, however the input data has no relevant properties for calculating it.
			// There is also supposed to be a "meter" type rents, but again there is no price per mile on the input data.
		}
	}
	
    return (
      <div>
        <ProductSelector name="productId" value={this.state.productId} options={this.props.products} onChange={this.handleInputChange}  />
		
		<input type="number" name="used_mileage" onChange={this.handleSelectedProductChange} />
		
		<input type="button" value="Cancel" onClick={this.props.onCancel} />
		<input type="button" value="Return" disabled={!validReturn} onClick={this.showConfirmationDialog} />

		<ReturnConfirmationDialog visible={this.state.confirmationDialogVisible} price={price} onCancel={this.cancelConfirmationDialog} onConfirm={this.confirmConfirmationDialog} />
	  </div>
    );
  }
}

export default ReturnDialog;
