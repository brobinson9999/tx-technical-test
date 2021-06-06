import React, { Component } from "react";
import { render } from "react-dom";
import ReturnDialog from "./ReturnDialog";

class ReturnButton extends Component {
  constructor(props) {
    super(props);
	this.state = {
		dialogVisible: false
	};

	this.handleChange = this.handleChange.bind(this);	
  }

  handleChange(event)
  {
    this.setState({dialogVisible: true});
  }

  render() {
    return (
	  <div>
        <input type="button" onClick={this.handleChange} value="Return" />

        <ReturnDialog visible={this.state.dialogVisible} products={this.props.products} />
	  </div>
    );
  }
}

export default ReturnButton;
