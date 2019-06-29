import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Change_Color} from '../store/actions.js';

class List extends React.Component {   
    handleClick = () => {
        var param = this.props.done;
        this.props.onhandleChange();
        this.props.Change_Color(!param,this.props.id); 
    }
    drag_start = (e) => {
        e.dataTransfer.setData('content',e.target.textContent);
        localStorage.removeItem(this.props.id)
        setTimeout(()=>{this.flag.className = 'hide';},0);
        if(!localStorage.getItem(this.props.name)) {
            return false;
        } else {
            let dataOfCard = JSON.parse(localStorage.getItem(this.props.name));
            let index = dataOfCard.indexOf(this.flag.textContent.replace(/\s+/g, " ").replace(/^\s|\s$/g, ""));
            if (index != -1) {
                 dataOfCard.splice(index,1);
                 localStorage.setItem(this.props.name,JSON.stringify(dataOfCard));
            }
        }
    }
    
    render() {
        var value = null;
        for (let key in this.props.colorOfStore) {
            if (this.props.id == key) {
                value = this.props.colorOfStore[key];
                localStorage.setItem(key,JSON.stringify(value));
            }      
        }
        return(
            <li draggable = 'true' onDragStart = {this.drag_start} ref = {(node) => this.flag = node} className = {JSON.parse(localStorage.getItem(this.props.id)) ? 'backgr list' : 'list'}>
                  {this.props.text}
                  <i onClick = {this.handleClick} ref = {(node) => this.tag = node} className = {JSON.parse(localStorage.getItem(this.props.id)) ? 'galD fas fa-check' : 'gal fas fa-check'}>
                  {JSON.parse(localStorage.getItem(this.props.id)) && <i className = 'fas fa-slash' id = 'text_of_li'></i>} </i>
             </li>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        colorOfStore : state.color
    }
}
const mapActionsToProps = (dispatch) => {
    return {
        Change_Color : bindActionCreators(Change_Color,dispatch)
    }
}
export default connect(mapStateToProps,mapActionsToProps)(List);
