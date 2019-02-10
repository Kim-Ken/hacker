import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import sentences1 from './sentenceJson';

var thisChat;
var lineCount=1;
var wordCount=0;
var movingSentence=0;
var clock;
var clockMoveFlag=false;
var BNpV=""
 
function Line(rApp){
  if(clockMoveFlag===true){
    wordCount=100
    clearInterval(clock)
    clockMoveFlag=false;
    return
  }
  wordCount=0;
  lineCount++;
  thisChat.setState({
    endPos:lineCount
  });
  if(lineCount>thisChat.state.numsRange){
    thisChat.setState({
      randerFinishFlag:true
    });
  }
}


function word(){

}


class Chat extends Component {
  constructor(props) {
    super(props);

    let sentenceData=sentences1

    let numsRange =100;
    let fontsize =45
    let setedHeightNums =[];
    let setedWidthNums =[];
    if(window.innerWidth<760)
      fontsize=25

    var numsWidth = window.innerWidth/fontsize*1.5;
    var numsHeight = window.innerHeight/fontsize;


    this.state = {
      sentenceData:sentenceData,
      fontsize:fontsize,
      endPos:1,
      startPos:0,
      numsRange:numsRange,
      numsHeight:numsHeight,
      numsWidth:numsWidth,
      randerFinishFlag:false,
    };

    this.start = this.start.bind(this);
    thisChat=this;
    document.addEventListener('click',this.start, false);
  }


  start(){
    Line(this);
    thisChat=this
    clockMoveFlag=true
    clock=setInterval(function(){wordCount++;
      thisChat.setState({a:"a"})
      }
     ,70);
  }


  render() {

    var renderHtml = [];

    var index =this.state.endPos;

    if(index>this.state.sentenceData.length){
      index=this.state.sentenceData.length;
    }

    for(var i=this.state.startPos;i<index;i++){
      renderHtml.push(<Nums key={i} keyNum={i}value={this.state.sentenceData[i].text}
        name={this.state.sentenceData[i].name} fontsize={this.state.fontsize}/>);
    }
    if(movingSentence!==0)
      movingSentence=index-1
    else
      movingSentence=1


    return (<div className="Chat">
      {renderHtml}
    </div>);
  }

}


class Nums extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name:props.name,
      value:props.value,
      keyNum:props.keyNum,
      fontsize:props.fontsize
    };
  }  

  render(){
    var renderHtml = [];
    let i=0;
    let NpV;
    let type="black"
    if(NpV!==BNpV){
      BNpV=NpV
      type="green"
    }
    if(this.state.value.length!==0)
      NpV=[...this.state.name+">>"+this.state.value]
    else
      NpV=[]
    let numsIndex=0
    if(this.state.keyNum!==movingSentence){
      numsIndex=NpV.length;
    }
    else{
      numsIndex=wordCount;
      if(NpV.length<wordCount){
        clearInterval(clock)
        clockMoveFlag=false
      }
    }

    for(let j=0;j<numsIndex;j++){
      let v = NpV[j]
      renderHtml.push(<Num key={j} value={v} fontsize={this.state.fontsize}/>);
    }

    return(<div className="chatWords">
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
    //if(!(this.state.word==="1"||this.state.word==="0")){
    //  wordColor="red";
    // wordClass="AnswerNum";
    //}
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

export default Chat;


