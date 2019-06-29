import React from 'react';
import {Cards} from './Cards.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Add_Data} from '../store/actions.js';
import ntf from '../photos/NotBoard.PNG';
import '../App.css';

class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            description : '',
            data : null,
            local: JSON.parse(localStorage.getItem('cards')),
            load : false,
            success:false
        }
        this.link = React.createRef();
    }
    add = (event) => {
        switch (event.target.name) {
            case 'title' :
                this.setState({
                    title : event.target.value
                })
                break;
            case 'description' :
                this.setState({
                    description : event.target.value
                 })
                 break;
        }
    }
    checkData = (title,description) => {
        let len_title = title.length;
        let len_description = description.length;
        var i = 0; var j = 0;
        while (len_title!=0) {
            if (title[i] != ' ') {
                i = true
                break;
            }
            i ++;
            len_title --;
        }
        while (len_description!=0) {
            if (description[j] != ' ') {
                j = true;
                break;
            }
            j ++;
            len_description --
        }
          if (typeof(i) == 'number' && typeof(j) == 'number') {
            this.title.style.border = '2px solid red';
            this.description.style.border = '2px solid red'
            return false;
        } else if (typeof(i) == 'number' && typeof(j) != 'number') {
            this.title.style.border = '2px solid red';
            this.description.style.border = '';
            return false;
        } else if (typeof(i) != 'number' && typeof(j) == 'number') {
            this.title.style.border = '';
            this.description.style.border = '2px solid red'
            return false;
        } else return true;

    }
    save = (e) => {
        if(!this.checkData(this.state.title,this.state.description)) {
            return false
        } else {
            this.title.style.border = '';
            this.description.style.border = '';
        }
        this.setState({
            load : true
        });

        if(this.props.data.cards.length!=0) {
            setTimeout(() => {
                this.props.add(this.state);
            },1000)
        } else {
            this.props.add(this.state);
        }

        setTimeout(()=>{
            this.setState((prevState) => {
                return {
                    done : true,
                    success:true,
                    load: false,
                    title : '',
                    description : ''
                }});
            if(!localStorage.getItem('cards')) {
                localStorage.setItem('cards',JSON.stringify(this.props.data.cards));
                this.put();
                this.setState({
                    local:JSON.parse(localStorage.getItem('cards'))
                });
            } else {
                var store = JSON.parse(localStorage.getItem('cards'));
                localStorage.setItem('cards',JSON.stringify([...store,this.props.data.cards[this.props.data.cards.length-1]]));
                this.put();
                this.setState({
                    local:JSON.parse(localStorage.getItem('cards'))
                });
            }
            
        },1000)
    }
    closeModal = () => {
        this.title.style.border = '';
        this.description.style.border = '';
        this.setState({
             success:false
        });
    }
    put = () => {
        JSON.parse(localStorage.getItem('cards')).forEach((item,index) => {
            if (!localStorage.getItem(index)) {
                localStorage.setItem(index,JSON.stringify([item.description]))
            }
        });
    }

    render() {
        return (
            <div className = 'main' ref = {this.link} >
                <header>
                    <i onClick = {()=>{window.location = '/'}} className=" left fas fa-arrow-left"></i>
                    <h4 id = 'title' className = 'text-center'>Trello</h4>
                    <i data-toggle = 'modal' data-target = '#block' id='plus' className="fas fa-plus"></i>
                    <div className = 'modal fade' id = 'block' ref = {(node)=>this.modal=node}>
                        <div className = 'modal-dialog'>
                            <div className = 'modal-content'>
                                <div className = 'modal-header'>
                                    <center><h3 className = 'text-warning text-center'>Board</h3></center>
                                    <button className = 'close' onClick ={this.closeModal} data-dismiss = 'modal'>x</button>
                                </div>
                                <div className = 'modal-body' >
                                    <span style = {{color:'black'}}>Title: </span>
                                    <input ref = {(node)=>this.title = node} name ='title' style={{margin:'5px'}} className = 'form-control' value = {this.state.title} onChange= {this.add} placeholder = 'Type something' type = 'text' />
                                    <span style = {{color:'black'}}>Description: </span>
                                    <input ref = {(node)=>this.description = node} name ='description' style={{margin:'5px'}} value = {this.state.description} className = 'form-control' onChange= {this.add} placeholder = 'Type something' type = 'text' />
                                </div>
                                <div className = 'modal-footer' style = {{display:'block'}}>
                                    {this.state.load ? <div id = 'loadFromSave'>Loading<div id = 'example'></div></div> : this.state.success && <div id = 'success'>Successfully!</div>}
                                    <button onClick = {this.save} style = {{position:'relative',left:'85%',marginLeft:'0px'}} className = 'clock btn btn-outline-success'>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className = 'row cards'>
                    {this.state.local ? JSON.parse(localStorage.getItem('cards')).map((item,i) => <Cards nickName = {i} key = {i} data = {item}/>) : <div id = 'skillBox' className = 'col-10 col-sm-5 offset-sm-3'><img src = {ntf} id = 'ph_board' /><p className = 'text-center text-info'>Sorry,but you dont have a board.</p></div>}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data : state
    }
}
const mapActionToProps = (dispatch) => {
    return {
        add : bindActionCreators(Add_Data,dispatch),
    }
}
export default connect(mapStateToProps,mapActionToProps)(Boards);
