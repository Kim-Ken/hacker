import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

var password
//var renderHtml = [];
var nums =[];
var num=[];
var numsWidth =window.innerWidth/20
//var wordNumHeight =window.innerHeight/70-3
var numsRange =100;
var fontsize =90;
var setedHeightNums =[];
var setedWidthNums =[];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setedHeightNums.push(getRandomInt(numsRange));
setedWidthNums.push(getRandomInt(numsWidth));

for(var i=0;i<numsRange;i++){
  for(var t=0;t<numsWidth;t++){
    if(i===setedHeightNums[0]&&t===setedWidthNums[0]){
      num.push("a");
    }
    else{
      var n =getRandomInt(5);
      if(n===2){
        n="0";
      }
      else{
        if(n%2===1){
          n=1;
        }
        if(n%2===0){
          n=0;
        }
        n=String(n);
      }
      num.push(n);
    }
  }
nums.push(num);
num=[];
}
for(var j=0;j<numsWidth;j++){
    num.push(" ");
  }
nums.push(num);
num=[];


ReactDOM.render(<App password={password} nums={nums} size={fontsize}/>, document.getElementById('root'));

serviceWorker.unregister();
