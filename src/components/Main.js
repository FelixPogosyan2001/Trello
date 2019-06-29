import React from 'react';
import '../App.css';
import Trello from '../photos/trello.png';
import {Info} from './Info.js';

const Main  = () => {
   return (
     <div className = 'App'>
        <div className="row" style = {{margin:'0px'}}>
          <Info/>
         </div>
        <img id = 'tr_ph' src = {Trello} style = {{width:'60%',position:'absolute',top:'50%',right:'20%'}} />
     </div>
    )
}
export default Main;
