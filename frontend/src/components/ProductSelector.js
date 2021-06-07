import React, { Component } from "react";
import { render } from "react-dom";

class ProductSelector extends Component {
  constructor(props) {
    super(props);
	this.state = {
		sort_by: "name"
	};
  }

  render() {
    return (
      <select name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
	    <option key="-1" value="-1">[no product selected]</option>
	    {this.props.options.map((option) => (
		  <option key={option.id} value={option.id}>{option.name}</option>
		))}
      </select>
    );
  }
}

export default ProductSelector;
