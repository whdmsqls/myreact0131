import React from "react"
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddToDo extends React.Component{
  constructor(props){
    super(props);

    //App.js파일에서 넘겨준 메서드를 add에 저장
    this.add = props.add;

    //입력한 문자열을 저장하기 위한 속성을 생성
    this.state = {item:{title:""}}
  }  

  //TextField에서 값을 입력할 때마다 호출되는 이벤트 리스너
  onInputChange = (e) => {
    //state.title에 입력한 내용을 대입
    // this.state.item.title = ~~ 이렇게 직접수정 불가 state는 변경불가
    //const는 변경이 불가능한 데이터에 이름을 붙일 때 사용
    const thisItem = this.state.item
    //thisItem = ? -> 이게 변경, 이런 과정을 할 수 없는게 변경이 불가능 한 것
    thisItem.title = e.target.value;
    this.setState({item:thisItem});
    console.log(this.state.item.title) //내가 쓰는 걸 콘솔에서 확인 가능
  }

  onButtonClick = (e) => {
    //배열에 데이터를 삽입하는 함수를 호출
    this.add(this.state.item);
    //텍스트필드를 초기화
    this.setState({item:{title:""}})
  }
  //Enter를 누르면 호출되는 리스너
  enterKeyEventHandler = (e) => {
    if(e.key === "Enter"){
      this.onButtonClick();
    }
  }


  render(){
    return(
      <Paper style={{margin:16, padding:16}}>
        <Grid cuntatiner>
          <Grid xs={11} md={11} item style={{paddingRight:16}}>
            <TextField placeholder="여기에 작성하시오" fullWidth 
            onChange={this.onInputChange} value={this.state.item.title}
            onKeyPress={this.enterKeyEventHandler}/>
          </Grid>
          <Grid xs={1} md={1} item>
            <Button fullWidth color="secondary" onClick={this.onButtonClick}>
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default AddToDo