import React from 'react';
import  { formatPrice } from '../helpers';

class Order extends React.Component{

  _renderOrderList(orderKeys){
    return orderKeys.map( key => {
          const fish = this.props.fishes[key];
          const amount = this.props.order[key];
          const removeButton = <button onClick={ ()=>{ this.props.removeFromOrder(key) } }>&times;</button>;

          if(!fish || fish.status === 'unavailable'){
            return(
              <li key={key}>Sorry {fish ? fish.name : 'fish'} is not longer available! {removeButton}</li>
            )
          }
          return(
              <li key={key}>
                <span>{amount}lbs {fish.name}</span>
                {removeButton}
                <span className="price">{formatPrice(amount * fish.price)}</span>
              </li>
          )
        });
  }

  _calculateTotal(orderKeys){
    const total = orderKeys.reduce( (prevTotal, key)=> {
          const fish = this.props.fishes[key];
          const amount = this.props.order[key];
          if(fish && fish.status === 'available'){
            return prevTotal + (fish.price * amount);
          }else{
            return prevTotal;
          }

        }, 0);
    return formatPrice(total);
  }

  render(){
    const orderKeys = Object.keys(this.props.order);
      return (
        <div className="order-wrap">
          <h2>Your Order</h2>
          <ul className="order">
            {this._renderOrderList(orderKeys)}
            <li className="total">
              <strong>Total: {this._calculateTotal(orderKeys)}</strong>
            </li>
          </ul>
        </div>
      )
  }
}

export default Order;
