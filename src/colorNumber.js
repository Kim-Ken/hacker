import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
 
//function getRandomInt(max) {
//  return Math.floor(Math.random() * Math.floor(max));
//}

var thisApp;
var i=0;
var clock;


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


export default class ColorNumber extends Component {
  constructor(props) {
    super(props);

    let nums=[]

    let numsRange =4;
    let fontsize =(function(){
      if(window.innerWidth>window.innerHeight)
        return window.innerHeight/3-60
      else
        return window.innerWidth/3-20
    }());
    let password=""
    thisApp=this;

    let setedHeightNums =[];
    let setedWidthNums =[];

    var numsWidth = 4;
    var numsHeight = 4;
    var puzzles=[[0,1],
      [0,3],
      [1,2],
      [1,4],
      [4,5],
      [3,4],
      [6,7],
      [7,8],
      [5,8]]

    for(var i=0;i<9;i++){
      nums.push(getRandomInt(0))
    }


    setedHeightNums.sort(function(a,b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
    })



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
      winFlag:false,
      randerFinishFlag:false,
      puzzles:puzzles
    };
    this.start = this.start.bind(this);
  }

  line(){
  }

  start(){
    //var i=0;
    this.line();
  }

  render() {

    var renderHtml = [];

    for(var i=0;i<3;i++){
      renderHtml.push(<Nums key={i} value={i} fontsize={this.state.fontsize}/>);
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
      value:props.value,
      key:props.keys,
      password:props.password,
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
          Input Code
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
    for(var i=0;i<3;i++){
      renderHtml.push(<Num key={i} value={this.state.value*3+i} fontsize={this.state.fontsize}/>);
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
      index:props.value,
      value:thisApp.state.nums[props.value],
      key:props.keys,
      fontsize:props.fontsize,
    };
    this.click = this.click.bind(this);
  }

  click(){
    let nums=thisApp.state.nums
    let pu=[];
    for(let v of thisApp.state.puzzles){
      for(let h of v){
        if(h===this.state.index){
          pu.push(v)
        }
      }
    }
    var a=[]
    for(let p of pu){
      for(let h of p)
        a.push(h)
    }
    var b = a.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
    for(let j of b){
        if(nums[j]>=1)
          nums[j]=-1
        nums[j]=++nums[j]
    }
    let winFlag=true
    for(let v of nums){
      if(v===0)
        winFlag=false
    }
    console.log(winFlag)
    thisApp.setState({
      winFlag:winFlag,
      nums:nums
    })
  }

  render(){
    let wordColor="red";
    let wordClass="Num";
    //if(!(this.state.word==="1"||this.state.word==="0")){
      //wordColor="red";
      //wordClass="AnswerNum";
    //}
    let ass =thisApp.state.nums[this.state.index]
    let r=255
    let g=255
    let b=255
    let styleMode
    if(ass===1){
      g=250
      b=100
      r=100
      styleMode="NumBox"
    }
    else{
      g=50
      b=50
      r=240
      styleMode="NumRedBox"
    }
    let styles={
      fontSize:this.state.fontsize,
      background:`rgb(${[r,g,b]})`,
      width:this.state.fontsize,
      height:this.state.fontsize,
      display:"inline-block",
      border:"solid",
      borderColor:"black",
      position:"relavie",
      textAlign:"center",
      margin:"auto",
      color:"green"
    }
    let aStyle={
      position:"absolute",
      width:this.state.fontsize*4,
      height:this.state.fontsize*4,
    }
    return(
      <div className={styleMode} onClick={this.click}style={styles}>
      </div>
    )
      //{thisApp.state.nums[this.state.index]}
  }
}


