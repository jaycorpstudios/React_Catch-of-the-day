import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component{

_handleUpdate(e, key){
  const updatedFish = {...this.props.fishes[key], [e.target.name]: e.target.value };
  this.props.updateFish(key, updatedFish);
}

_renderFishesInventory(keys){
  return keys.map( key => {
    const fish = this.props.fishes[key];
    return(
       <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} onChange={ (e)=>{ this._handleUpdate(e, key) } } />
        <input type="text" name="price" value={fish.price}onChange={ (e)=>{ this._handleUpdate(e, key) } } />
        <select name="status" value={fish.status} onChange={ (e)=>{ this._handleUpdate(e, key) } }>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" value={fish.desc} onChange={ (e)=>{ this._handleUpdate(e, key) } }></textarea>
        <input type="text" name="image" value={fish.image} onChange={ (e)=>{ this._handleUpdate(e, key) } } />
        <button onClick={ ()=>{ this.props.deleteFish(key)} }>Delete</button>
      </div>
    )
  });
}

  render(){
    const keys = Object.keys(this.props.fishes);
      return (
        <div>
          <h1>Inventory</h1>
          {this._renderFishesInventory(keys)}
          <AddFishForm addFish={this.props.addFish}/>
          <button onClick={this.props.loadFishSamples}>Add sample fishes</button>
        </div>
      )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  deleteFish: React.PropTypes.func.isRequired,
  loadFishSamples: React.PropTypes.func.isRequired
}

export default Inventory;
