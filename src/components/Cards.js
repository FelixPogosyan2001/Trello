import React from 'react';
import {List} from './List.js';

export class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add:'',
            content:[],
            alert : ''
        }
        this.ul = React.createRef();
    }

    enter = (e) => {
        var code = e.key;
        var value = e.target.value;
        if (code == 'Enter' && value != false) {
              var array = JSON.parse(localStorage.getItem(this.props.nickName));
              if (array.indexOf(value) == -1 ) {
                    array.push(value);
              } else {
                    this.setState({
                        alert : 'This task already exists',
                        add : ''
                    });
              }
                localStorage.setItem(this.props.nickName,JSON.stringify(array));
                this.setState({ add : '' });
        }
    }
    
    drop = (e) => {
        var content = e.dataTransfer.getData('content'); 
        this.leave();
        var array = JSON.parse(localStorage.getItem(this.props.nickName));
        array.push(content.replace(/\s+/g, " ").replace(/^\s|\s$/g, ""));
        localStorage.setItem(this.props.nickName,JSON.stringify(array));
        this.forceUpdate();
    }
    
    dragColos = () => {
        this.card.className = 'card border-warning';
    }

    leave = () => {
        this.card.className = 'card border-info';
    }

    render() {
        var data;
        if (localStorage.getItem(this.props.nickName) && JSON.parse(localStorage.getItem(this.props.nickName)).length!=0) {
            data = JSON.parse(localStorage.getItem(this.props.nickName)).map((item,i)=> <List key = {i+Math.random()} name = {this.props.nickName} text = {item} />);
        } else {
            data = '';
        }
         return (
            <div onDragEnter = {this.dragColos} ref = {(node) => {this.card = node}} className = 'card border-info' style={{maxWidth: '18rem',margin:'25px'}}>
               <div className = 'card-header'>
                   <h2 className = 'text-center'>{this.props.data.title}</h2>
                   <input id = {this.props.nickName} value = {this.state.add} onChange = {(e)=>{this.setState({add:e.target.value,alert:''})}} onKeyPress = {this.enter} type = 'text' placeholder = 'Add...' className = 'form-control' />
                   <p id = 'warningText' className = 'text-danger text-center'>{this.state.alert}</p>
              </div>
             <div onDragLeave = {this.leave} onDrop = {this.drop} onDragOver = {(e) => {e.preventDefault()}} className = 'card-body'>
                  <ul type = 'none' ref = {this.ul} >
                       {data}
                 </ul>
            </div>
          </div>
         )
    }
}