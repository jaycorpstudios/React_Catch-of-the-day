import React from 'react';
import base from '../firebaseDB'

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import fishesSamples from '../sample-fishes';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount(){
    //Sync with Firebase
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
      context: this,
      state: 'fishes'
    });

    //Grab order data from LocalStorage
    const orderStoreKey = `store-${this.props.params.storeId}`;
    const orderData = localStorage.getItem(orderStoreKey);
    if(orderData){
      this.setState({
        order: JSON.parse(orderData)
      });
    }
  }

  componentWillUnmount(){
    base.removeBonding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    const orderStoreKey = `store-${this.props.params.storeId}`;
    localStorage.setItem( orderStoreKey, JSON.stringify(nextState.order) );
  }

  _addFish(fish){
    const fishes = {...this.state.fishes};
    const key = Date.now();
    fishes[`fish-${key}`] = fish;
    this.setState( { fishes} );
  }

  _updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState( {fishes} );
  }

  _deleteFish(key){
    const fishes = {...this.state.fishes};
    fishes[key] = null; //Firebase requires this approach, delete property will not work;
    this.setState( {fishes} );
  }

  _loadFishSamples(){
    this.setState( { fishes: fishesSamples } )
  }

  _renderFishes(){
    return Object.keys(this.state.fishes).map( (key) => {
      const fish = this.state.fishes[key];
      return (
        <Fish
          key={key}
          id={key}
          details={fish}
          addToOrder={ this._addToOrder.bind(this) }/>
      )
    });
  }

  _addToOrder(fishKey){
    const order = {...this.state.order};
    order[fishKey] = order[fishKey] + 1 || 1;
    this.setState( {order} );
  }

  _removeFromOrder(fishKey){
    const order = {...this.state.order};
    delete order[fishKey];
    this.setState( {order} );
  }

  render(){
      return (
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline={'fresh seafood market'}/>
            <ul className="list-of-fishes">
              {this._renderFishes()}
            </ul>
          </div>
        <Order
          fishes={ this.state.fishes }
          order={ this.state.order }
          removeFromOrder={ this._removeFromOrder.bind(this) } />
        <Inventory
          fishes={ this.state.fishes }
          addFish={ this._addFish.bind(this) }
          loadFishSamples={ this._loadFishSamples.bind(this) }
          updateFish={ this._updateFish.bind(this) }
          deleteFish={ this._deleteFish.bind(this) }
          storeId={ this.props.params.storeId }/>
        </div>
      )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
