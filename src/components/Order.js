import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
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
                <CSSTransitionGroup
                  className="count"
                  component="span"
                  transitionName="count"
                  transitionEnterTimeout={250}
                  transitionLeaveTimeout={250}>
                    <span key={amount}>{amount}</span>
                </CSSTransitionGroup>
                lbs {fish.name}{removeButton}
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
          <CSSTransitionGroup
            className="order"
            component="ul"
            transitionName="order"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
              {this._renderOrderList(orderKeys)}
              <li className="total">
                <strong>Total: {this._calculateTotal(orderKeys)}</strong>
              </li>
          </CSSTransitionGroup>
        </div>
      )
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;
