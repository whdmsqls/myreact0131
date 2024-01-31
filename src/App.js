import './App.css';

import React from 'react'
import ToDo from "./ToDo"
import AddToDo from './AddToDo'

import {Paper, List, Container} from "@material-ui/core"


class App extends React.Component {
  constructor(props){
    
    super(props)
    this.state = {items : []}
  }

  //화면이 보여질 때 마다 호출되는 수명주기 함수
  componentDidMount(){
    //ajax 요청 객체 생성
    let request = new XMLHttpRequest()
    //요청 준비
    request.open('GET', "http://127.0.0.1/todo?userid=eb1")
    //요청
    request.send('');
    //응답 처리
    request.addEventListener('load', () => {
      //json데이터 출력
      // console.log(request.responseText)
      let data = JSON.parse(request.responseText);
      console.log(data)
      //서버에서 받아온 데이터를 화면에 출력
      this.setState({items:data.list})
    })
  }

  add = (item) => {
    const thisItems = this.state.items;

    item.id = "ID_" + thisItems.length;
    item.done = false;

    thisItems.push(item)
    this.setState({items:thisItems});
  }

  delete = (item) => {
    //state나 props의 데이터는 직접 편집x
    const thisItems = this.state.items;

    //복사본에서 item을 제거
    //filter함수는 리턴 타입이 boolean함수를 매개변수로 받아서
    //리턴 결과가 true인 데이터만 모아서 배열로 리턴
    const newItems = thisItems.filter((e) => e.id !== item.id);
    
    //원본에 다시 복사
    this.setState({items:newItems})
  }

  render(){
    var display = this.state.items.length >0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx) => (
            <ToDo item={item} key={idx} delete={this.delete} />
          ))}
        </List>
      </Paper>
    )

    return(
      <div>
        <Container>
          <AddToDo add={this.add}/>
          {display}
        </Container>
      </div>
    )
  }
}

export default App;
