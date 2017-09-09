import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../firebaseDB'

class Inventory extends React.Component{

  constructor(){
    super();
    this._authenticate = this._authenticate.bind(this);
    this._authHandler = this._authHandler.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth( (user)=> {
      if(user){
        this._authHandler(null , { user });
      }
    });
  }

_renderLogin(){
  return(
    <nav className="login">
      <p>Sign in to manage your inventory</p>
      <button
        className="facebook"
        onClick={ ()=>{ this._authenticate('facebook') } }>
        Log in with Facebook
      </button>
      <button
        className="twitter"
        onClick={ ()=>{ this._authenticate('twitter') } }>
        Log in with Twitter
      </button>
    </nav>
  )
}

_authenticate(provider){
  base.authWithOAuthPopup(provider, this._authHandler);
}

_logout(){
  base.unauth();
  this.setState({ uid: null });
}

_authHandler(err, authData){
  //TODO: add handler for errors
  if(err){
    return;
  }

  //Grab Store info
  const storeRef = base.database().ref(this.props.storeId);
  
  //Query the firebase once for the store data
  storeRef.once('value', (snapshop)=>{
    const data = snapshop.val() || {};
    //Clam it as own if there is no owner already
    if(!data.owner){
      storeRef.set({ owner: authData.user.uid });
    }
    this.setState({
      uid: authData.user.uid,
      owner: data.owner || authData.user.uid
    })
  });
}


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
    const logoutBtn = (<button onClick={this._logout.bind(this)}>Log Out</button>)
    //Check for logged user
    if(!this.state.uid){
      return (
        <div>{ this._renderLogin() }</div>
      )
    }
    //Check is users is the owner
    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry you are not the owner of this store.</p>
          <div>{logoutBtn}</div>
        </div>
      )
    }
    return (
      <div>
        <h1>Inventory</h1>
        <div>{logoutBtn}</div>
        {this._renderFishesInventory(keys)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadFishSamples}>Add sample fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  storeId: React.PropTypes.string.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  deleteFish: React.PropTypes.func.isRequired,
  loadFishSamples: React.PropTypes.func.isRequired
}

export default Inventory;
