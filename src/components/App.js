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
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount(){
    base.removeBonding(this.ref);
  }

  _addFish(fish){
    const fishes = {...this.state.fishes};
    const key = Date.now();
    fishes[`fish-${key}`] = fish;
    this.setState( { fishes} );
  }

  _loadFishSamples(){
    this.setState( { fishes: fishesSamples } )
  }

  _renderFishes(){
    return Object.keys(this.state.fishes).map( (key) => {
      const fish = this.state.fishes[key];
      return (
        <Fish key={key} id={key} details={fish} addToOrder={ this._addToOrder.bind(this) } />
      )
    });
  }

  _addToOrder(fishKey){
    const order = {...this.state.order};
    order[fishKey] = order[fishKey] + 1 || 1;
    this.setState( {order} );
  }

  render(){
      return (
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="fresh seafood market"/>
            <ul className="list-of-fishes">
              {this._renderFishes()}
            </ul>
          </div>
        <Order
          fishes={ this.state.fishes }
          order= { this.state.order } />
        <Inventory
          fishes={ this.state.fishes }
          addFish={ this._addFish.bind(this) }
          loadFishSamples={ this._loadFishSamples.bind(this) } />
        </div>
      )
  }
}

export default App;
