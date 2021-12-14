import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import MainPage from './pages/Dashboard/Dashboard';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { useState, useEffect } from 'react';

function App() {
  const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
  const [LoggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element= {<Login />} />
          <Route path="/dashboard" element={<MainPage />} />
        </Routes>
      </Router>
      </Provider>
  );
}

export default App;
