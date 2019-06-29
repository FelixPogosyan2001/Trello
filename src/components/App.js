import React,{Component} from 'react';
import Main from './Main.js';
import Boards from './Boards.js';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import '../App.css';

const App = (props) => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path = '/' component = {Main} />
          <Route path = '/boards' component = {Boards} />
        </Switch>
      </BrowserRouter>
    )
}
export default App;
