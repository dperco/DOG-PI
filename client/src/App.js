import './App.css';
import {Route,BrowserRouter} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import Forms from './components/Forms';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Route exact path="/" component={LandingPage}/>
    <Route  exact path="/home" component={Home}/>
    <Route exact path="/temperament" component={Forms}/> 
    <Route exact path="/home/:id" component={Detail}/> 
    </div>
    </BrowserRouter>
  );
}

export default App;
