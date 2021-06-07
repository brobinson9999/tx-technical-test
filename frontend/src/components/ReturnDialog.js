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

  // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
  formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	return [year, month, day].join('-');
  }

  getProduct()
  {
	for (var i=0;i<this.props.products.length;i++)
	{
		if (this.props.products[i].id == this.state.productId)
		{
			return this.props.products[i];
		}
	}
	return null;
  }

  getBooking()
  {
	for (var i=0;i<this.props.bookings.length;i++)
	{
		// Find the first booking with a matching product_id that is not already returned.
		if (this.props.bookings[i].product_id == this.state.productId)
		{
			if (this.props.bookings[i].returned_at == null)
			{
			  return this.props.bookings[i];
			}
		}
	}
	return null;
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
	// must format date to YYYY-MM-DD
	booking.returned_at = this.formatDate(new Date());

	// Update product.mileage and product.durability.
	var product = this.getProduct();
	if (product.mileage != null)
	{
	  product.mileage += parseInt(this.state.used_mileage);
	}
	
	const endDate = new Date();
	const startDate = new Date(booking.start_date);

	// This could charge based on how long you actually rented the item for, or how long you booked it for. I've gone with the actual days rented here.
    const millisecondsPerDay = (1000 * 3600 * 24);
	var rentalPeriod = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);

	// When start date = end date, the rental period is 1 day.
	rentalPeriod += 1;
	// Might want to cap this at 0, and possibly set needs_to_repair when it hits 0.
	if (product.type == "plain")
	{
		product.durability -= rentalPeriod * 1;
	} else if (product.type == "meter")
	{
		product.durability -= (rentalPeriod * 2) + (2 * Math.ceil(this.state.used_mileage / 10));
	} else {
		throw 'Unrecognized product type!'
	}

	// Could be more efficient if it only PATCHed the part that changed, instead of the whole model object, but this is arguably simpler code.
	fetch('/api/booking/' + booking.id.toString(), {
	  method: 'PATCH',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(booking),
	}).then(() => {
		fetch('/api/product/' + product.id.toString(), {
		  method: 'PATCH',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(product),
		})
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
	
	var product = this.getProduct();
	var booking = this.getBooking();
	
	const needsMileage = (product != null && product.mileage != null);
	const hasMileage = (this.state.used_mileage != "");
	var validReturn = (product != null && booking != null && (needsMileage == hasMileage));
		
	if (validReturn)
	{
		const millisecondsPerDay = (1000 * 3600 * 24);

		const endDate = new Date();
		const startDate = new Date(booking.start_date);

		// This could charge based on how long you actually rented the item for, or how long you booked it for. I've gone with the actual days rented here.
		var rentalPeriod = Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);
		// When start date = end date, the rental period is 1 day.
		rentalPeriod += 1;

		// Even if they return it early, do not charge less than the minimum.
		rentalPeriod = Math.max(rentalPeriod, product.minimum_rent_period);
		const pricePerDay = product.price;
		price = rentalPeriod * pricePerDay;
		
		// According to the docs, there is supposed to be a discount logic, however the input data has no relevant properties for calculating it.
		// There is also supposed to be a "meter" type rents, but again there is no price per mile on the input data.
	}
	
    return (
      <div>
        <ProductSelector name="productId" value={this.state.productId} options={this.props.products} onChange={this.handleInputChange}  />
		
		<input type="number" name="used_mileage" onChange={this.handleInputChange} />
		
		<input type="button" value="Cancel" onClick={this.props.onCancel} />
		<input type="button" value="Return" disabled={!validReturn} onClick={this.showConfirmationDialog} />

		<ReturnConfirmationDialog visible={this.state.confirmationDialogVisible} price={price} onCancel={this.cancelConfirmationDialog} onConfirm={this.confirmConfirmationDialog} />
	  </div>
    );
  }
}

export default ReturnDialog;
