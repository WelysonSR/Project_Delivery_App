import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes/Routes';
import store from './redux/store';

function App() {
  return (
    <main className="App">
      <BrowserRouter className="bwto">
        <Provider store={ store }>
          <Routes />
        </Provider>
      </BrowserRouter>
    </main>
  );
}

export default App;
