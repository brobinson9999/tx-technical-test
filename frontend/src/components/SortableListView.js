import React, { Component } from "react";
import { render } from "react-dom";

class SortableListView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.items.map(product => {
          return (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SortableListView;
