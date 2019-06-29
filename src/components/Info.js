import React,{Component} from 'react';

export class Info extends Component {
    render () {
        return (
          <div className = 'information col-9 col-sm-4 offset-sm-4 offset-2 text-center'> 
             <h1>Trello</h1>
             <p>Special constructor for organizating yours plans</p>
             <button onClick = {() => {window.location = '/boards'}} className = 'btn btn-success'>Go to your boards</button>
             <br/>
             <a href = 'https://trello.com/' id = 'checkInfo'>Check more infromation about Trello</a>
        </div>
        )
    }
}