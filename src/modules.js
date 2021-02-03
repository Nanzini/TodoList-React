import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPen, faTimes } from "@fortawesome/free-solid-svg-icons"


export class Print extends Component {
    constructor(props) {
        super(props);
        this.state ={
          list: props.lists.list,
        }
    }

  btn_deleteElement = (event) => {
    // currentTarget = 삭제할 <li>을 의미
    // li > svg > path
    let currentTarget = event.target;
    if(currentTarget.tagName ==='path')
      currentTarget= currentTarget.parentNode.parentNode
    else if(currentTarget.tagName ==='svg')
      currentTarget= currentTarget.parentNode
    
    const list = this.state.list;
    // 현재포커싱되는 태그의 id와 state에 저장된 id 비교
    for(let i=0; i<list.length; i++){
      if(list[i].id === Number(currentTarget.id)){
        list.splice(i,1);
        this.setState({
          list
        })
        localStorage.setItem('todo',JSON.stringify(list))
      } 
    }
  }

  handleChange = (event) => {
      const list = this.state.list;

      //currentTarget = input textTodo (parent : li)
      const currentTarget = event.target;
      const id = Number(currentTarget.parentNode.id)
      for(let i=0; i<list.length; i++){
        if(list[i].id === id){
          list[i].value = currentTarget.value;
          this.setState({
            list
          })
          localStorage.setItem('todo',JSON.stringify(list))  
        }
      }
  }

  btn_UpdateElement = (event) => {
    // currentTarget = 수정 할 <li>을 의미
    let currentTarget = event.target.parentNode;

    // 0:check, 1:input, 2:delete, 3:edit -> OK
    currentTarget.querySelector("span").remove();
    currentTarget.querySelector(".textTodo").disabled=false;
    const btn_check = document.createElement("span")
    btn_check.innerHTML ="👌"
    currentTarget.appendChild(btn_check)
    btn_check.addEventListener("click",this.btn_OKElement)

  }

  btn_OKElement = (event) => {
    let currentTarget = event.target.parentNode;

    currentTarget.querySelector("span").remove();
    currentTarget.querySelector(".textTodo").disabled=true;
    const btn_edit = document.createElement("span")
    btn_edit.innerHTML ="✏️"
    currentTarget.appendChild(btn_edit)
    btn_edit.addEventListener("click",this.btn_UpdateElement)
  }

  render() {
    return (
      <ul className="lists">
        {this.props.lists.list.map(item => { // props와 App과 따로놈.. 제대로하려면 App에다가 함수만들고 매개변수로 함수로 넘겨주기!
            return (
              <li key={item.id} id={item.id}>
                <input type="checkbox" className="checkTodo"/>
                <input type="text" value={item.value} className="textTodo" disabled={true} onChange={this.handleChange}/>
                <FontAwesomeIcon className='btn_delete' icon={faTimes} onClick={this.btn_deleteElement} />
                <span className='btn_edit' onClick={this.btn_UpdateElement}>✏️</span>
              </li>
            );
          })
        }
      </ul>
    );
    }
}

export const maxId = (list) =>{

  if(list === null){
   return 100;
  }
  else if(list !== null && list.length !== 0 ){
    const arrId = list.map(item => { return item.id})
    // 배열 내 최대값 구할 때는 apply.
    return Math.max.apply(null,arrId)
  }
  // [] 일때의 경우
  else{
    return 100;
  }
} 

export const getToday = () => {
  const today = new Date();
  const day = today.getDay();
  if(day === 1) return '月'
  else if(day === 2)  return '火'
  else if(day === 3)  return '水'
  else if(day === 4)  return '木'
  else if(day === 5)  return '金'
  else if(day === 6)  return '土'
  else  return '日'
}


