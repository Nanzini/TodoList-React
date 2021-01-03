import React, {Component} from 'react';
import {Print, maxId, getToday} from "./modules.js";

import './App.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class App extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      list: (JSON.parse(localStorage.getItem('todo'))) ? JSON.parse(localStorage.getItem('todo')) : [],
      id: (maxId((JSON.parse(localStorage.getItem('todo'))))) ,
      month : today.getMonth()+1,
      date : today.getDate(),
      day : getToday()
    };
  }

  btn_addElement = () => {
    const newElement = {
      id: 1+this.state.id,
      value: document.querySelector(".inputTodo").value
    };

    const list =this.state.list;

    list.push(newElement);

    this.setState({
      list,
      id : newElement.id
    });
    localStorage.setItem('todo',JSON.stringify(list))
    document.querySelector(".inputTodo").value = ""
}

  handelKeyPress = (event) => {
    //event.key는 키보드로 입력받은 그대로의 값 저장중.
    //event.charCode 13 엔터
    if(event.key === 'Enter'){
      this.btn_addElement()
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='head'>Todo List</div>
        <div className='today'>{this.state.month}월 {this.state.date}일 ({this.state.day})</div>
        <div className='title'>
          <input
              className='inputTodo'
              type='text'
              placeholder='오늘 할일을 적읍시다'
              onKeyPress={this.handelKeyPress}
            />
          <FontAwesomeIcon icon={faPlus} size="2x" onClick={this.btn_addElement}/>          
        </div>
        <Print lists={this.state} className='lists' />
      </div>
    );
  }
}

export default App;