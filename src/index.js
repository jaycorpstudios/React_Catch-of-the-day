import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Miss, Match } from 'react-router';

//Import Styles
import './css/style.css';

//Import Components
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.getElementById('main'));
