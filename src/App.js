import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Chat  from './chat.js'
import ColorNumber from './colorNumber.js'
//link
 
//function getRandomInt(max) {
//  return Math.floor(Math.random() * Math.floor(max));
//}

var thisApp;
var i=0;
var clock;

function Line(rApp){
  console.log(thisApp.state.numsRange);
  i++;
  thisApp.setState({
    startPos:i
  });
  if(i>thisApp.state.numsRange){
    console.log("tes");
    clearInterval(clock);
    thisApp.setState({
      randerFinishFlag:true
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



class App extends Component{
  constructor(props) {
    super(props);
    // stateの初期値を設定
    this.state = {
      str: '',
      isDisabled: true,
      nums:props.nums,
      size:props.size,
      startPos:0
    };
  }

  render(){
      return(
        <BrowserRouter>
          <div className="routerClass">
            <Route path="/wordseeker" render={() => <WordSeeker />} />
            <Route path="/colornumber" render={() => <ColorNumber  />} />
            <Route path="/chat" render={() => <Chat />} />
            <Route path="/text" render={() => <WordSeeker />} />
          </div>
        </BrowserRouter>
      );
    };
}


class WordSeeker extends Component {
  constructor(props) {
    super(props);

    let nums=[]
    let num=[]

    let numsRange =100;
    let fontsize =50;
    let password="password"

    let setedHeightNums =[];
    let setedWidthNums =[];

    var numsWidth = window.innerWidth/fontsize*1.5;
    var numsHeight = window.innerHeight/fontsize;


    for(var j=0;j<password.length;j++){
      setedHeightNums.push(getRandomInt(numsRange));     
      setedWidthNums.push(getRandomInt(numsWidth));
    }

    setedHeightNums.sort(function(a,b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
    })
    console.log(setedHeightNums);

    for(var i=0;i<numsRange;i++){
      for(var t=0;t<numsWidth;t++){
        for(var j=0;j<password.length;j++){
          if(i===setedHeightNums[j]&&t===setedWidthNums[j]){
            num.push(password[j]);
            continue;
          }
        }

      var n =getRandomInt(6);
      if(n%2===1){
        n=1;
        n=String(n);
      }
      else if(n%2===0){
        n=0;
        n=String(n);
      }
      num.push(n);
    }
    nums.push(num);
    num=[];
  }



    this.state = {
      password:password,
      str: '',
      isDisabled: true,
      nums:nums,
      fontsize:fontsize,
      startPos:0,
      numsRange:numsRange,
      numsHeight:numsHeight,
      numsWidth:numsWidth,
      pushedFlag:false,
      randerFinishFlag:false,
    };
    this.start = this.start.bind(this);
    thisApp=this;
  }


  start(){
    if(this.state.pushedFlag===true){
      return;
    }
    this.setState({
      pushedFlag:true
    });
    //var i=0;
    clock = setInterval(function(){ Line(this)},50);
  }

  render() {

    var renderHtml = [];

    var index =this.state.numsHeight+this.state.startPos;
    if(index>100){
      index=100;
    }
    for(var i=this.state.startPos;i<index;i++){
      renderHtml.push(<Nums key={i} value={this.state.nums[i]} fontsize={this.state.fontsize}/>);
    }
    if(this.state.randerFinishFlag===true){
      return(<div className="InputBoxC">
        <InputAnswer password={this.state.password}/>
        </div>
      )
    }
    return (<div className="WordSeeker" onClick={this.start}>
      {renderHtml}
    </div>);
  }

}

class InputAnswer extends Component{

  constructor(props) {
    super(props);
    this.state = {
      password:this.props.password,
      formValue:""
    };
    this.press = this.press.bind(this);
    this.changeForm= this.changeForm.bind(this);
  }
  press(){
    console.log(this.state.password===this.state.formValue);
  }          
  changeForm(e){
    this.setState({
      formValue:e.target.value
    })       
  }          
  render(){
    return(
      <div className="InputBox">
        <div className="kani">
          Input answer
        </div>
          <input type="text"name="inputbox"className="inputArea" onChange={this.changeForm}/>
          <input type="button" onClick={this.press} value="send data"className="inputButton"/>
      </div>
    )
  }
}

class Nums extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value:props.value,
      key:props.keys,
      fontsize:props.fontsize
    };
  }  

  render(){
    var renderHtml = [];
    let i=0;
    for(const v of this.state.value){
      renderHtml.push(<Num key={i++} value={v} fontsize={this.state.fontsize}/>);
    }

    return(<div className="words">
      {renderHtml}
    </div>)
  }
}
class Num extends Component{
  constructor(props){
    super(props);
    this.state = {
      word:props.value,
      key:props.keys,
      fontsize:props.fontsize
    };
  }

  render(){
    let wordColor="#25f72c";
    let wordClass="Num";
    if(!(this.state.word==="1"||this.state.word==="0")){
      wordColor="red";
      wordClass="AnswerNum";
    }
    let styles={
      fontSize:this.state.fontsize,
      color:wordColor
    }
    return(
      <span className={wordClass} style={styles}>
      {this.state.word}
      </span>
    )
  }
}

export default App;


