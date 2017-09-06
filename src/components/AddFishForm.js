import React from 'react';

class AddFishForm extends React.Component{

  _createFish(event){
    event.preventDefault();

//TODO: Maybe I can just focus on the main form and get each element as an array and stuff...
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }

    //TODO: Add validations and stuff
    this.props.addFish(fish);
    this.fishForm.reset();

  }

  render(){
      return (
        <form ref={ (input) => this.fishForm = input } className="fish-edit" onSubmit={ (e) => this._createFish(e) }>
          <input type="text" placeholder="Fish name" ref={ (input) => this.name = input }/>
          <input type="text" placeholder="Fish price" ref={ (input) => this.price = input }/>
          <select ref={ (input) => this.status = input }>
            <option value="available">Fresh</option>
            <option value="unavailable">Sold Out</option>
          </select>
          <textarea placeholder="Fish desc" ref={ (input) => this.desc = input }></textarea>
          <input type="text" placeholder="Fish image" ref={ (input) => this.image = input }/>
          <button type="submit">+ Add Fish</button>
        </form>
      )
  }
}

export default AddFishForm;
