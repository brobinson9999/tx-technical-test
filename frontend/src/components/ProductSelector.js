import React, { Component } from "react";
import { render } from "react-dom";

class ProductSelector extends Component {
  constructor(props) {
    super(props);
	this.state = {
		sort_by: "name"
	};

	this.handleChange = this.handleChange.bind(this);	
  }

  handleChange(event)
  {
    this.props.onChange(event.target.value);
  }


  render() {
    return (
      <select value={this.props.value} onchange={this.handleChange}>
	    {this.props.options.map((option) => (
		  <option value="{option.id}">{option.name}</option>
		))}
      </select>
    );
  }
}

export default ProductSelector;
