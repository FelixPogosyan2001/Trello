import React from 'react';

export class List extends React.Component {
    state = {
        done : false
    }
    handleClick = () => {
        this.setState({
            done : !this.state.done
        });         
    }
    componentDidUpdate() {
        if (this.state.done) {
            this.flag.classList.add('backgr');
            this.tag.className =  'galD fas fa-check';
        } else {
            this.flag.classList.remove('backgr');
            this.tag.className =  'gal fas fa-check';
        }
    }
    drag_start = (e) => {
        e.dataTransfer.setData('content',e.target.textContent);
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
        return(
            <li draggable = 'true' onDragStart = {this.drag_start} ref = {(node) => this.flag = node} className = 'list'>
                  {this.props.text}
                  <i onClick = {this.handleClick} ref = {(node) => this.tag = node} className ="gal fas fa-check">
                  {this.state.done && <i className = 'fas fa-slash' id = 'text_of_li'></i>} </i>
             </li>
        )
    }
}