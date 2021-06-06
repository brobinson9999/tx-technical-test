import React, { Component } from "react";
import { render } from "react-dom";

class SortableListView extends Component {
  constructor(props) {
    super(props);
	this.state = {
		sort_by: "name"
	};
  }

  render() {
    //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
	const dynamicSort = function(property) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			/* next line works with strings and numbers, 
			 * and you may want to customize it to your needs
			 */
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}		
	};
	  
    return (
      <table>
	    <thead>
		  <tr>
		    <th onClick={() => this.setState({sort_by: 'id'}) }>Id</th>
			<th onClick={() => this.setState({sort_by: 'name'}) }>Name</th>
			<th onClick={() => this.setState({sort_by: 'code'}) }>Code</th>
			<th onClick={() => this.setState({sort_by: 'availability'}) }>Availability</th>
			<th onClick={() => this.setState({sort_by: 'needing_repair'}) }>Need to Repair</th>
			<th onClick={() => this.setState({sort_by: 'durability'}) }>Durability</th>
			<th onClick={() => this.setState({sort_by: 'mileage'}) }>Mileage</th>
		  </tr>
		</thead>
		
		<tbody>
			{this.props.items.sort(dynamicSort(this.state.sort_by)).map(product => {
			  return (
				<tr key={product.id}>
				  <td>{product.id}</td>
				  <td>{product.name}</td>
				  <td>{product.code}</td>
				  <td>{product.availability ? "True" : "False"}</td>
				  <td>{product.needing_repair ? "True" : "False"}</td>
				  <td>{product.durability}/{product.max_durability}</td>
				  <td>{product.mileage}</td>
				</tr>
			  );
			})}
		</tbody>
      </table>
    );
  }
}

export default SortableListView;
