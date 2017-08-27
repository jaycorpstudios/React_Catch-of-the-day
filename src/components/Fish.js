import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component{

  render(){
    const { details, id } = this.props;
    const isAvailable = details.status === 'available';
      return (
        <li className="menu-fish">
          <img src={details.image} alt={details.name}/>
          <h3 className="fish-name">
            {details.name}
            <span className="price">{formatPrice(details.price)}</span>
          </h3>
          <p>{details.desc}</p>
          <button
            disabled={!isAvailable}
            onClick={ () => { this.props.addToOrder(id) } }>
            { (isAvailable) ? 'Add to order' : 'Sold Out' }
          </button>
        </li>
      )
  }
}

export default Fish;
