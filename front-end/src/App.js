import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes/Routes';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <BrowserRouter className="bwto">
        <Provider store={ store }>
          <Routes />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
