import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      running: null,
      chrono: '0 : 00 : 00 : 0'
    }
  }
  
  start = () => {
    this.setState({
      running: setInterval(this.display, 100)
    });
  }
  
  pause = () => {
    clearInterval(this.state.running);
  }
  
  reset = () => {
    this.pause();
    this.setState({
      counter: 0,
      chrono: '0 : 00 : 00 : 0',
      clockminutes: 0,
      clockseconds: 0
    });
    
    
  } 
  
  display = () => {
    let hours = Math.floor(this.state.counter / (60 * 60 * 10));
    let minutes = Math.floor((this.state.counter / ( 60 * 10)) % 60 );
    let seconds = Math.floor((this.state.counter / 10) % 60);
    let dseconds = this.state.counter % 10;
    this.setState({
      chrono: hours + ' : ' + minutes.toString().padStart(2,'0') + ' : ' + seconds.toString().padStart(2,'0') + ' : ' + dseconds,
      counter: this.state.counter + 1,
      clockminutes: (minutes * Math.PI / 30) + (seconds * Math.PI / (30 * 60)),
      clockseconds: (seconds * Math.PI / 30)
    });
  
    
  }
  componentDidMount = () =>{
    let canvas = this.refs.canvas;
    this.ctx = canvas.getContext("2d");
    this.radius = canvas.height / 2;
    this.ctx.translate(this.radius, this.radius);
    this.radius = this.radius * 0.90;
    this.drawClock();
    }

    componentDidUpdate = () =>{
      this.drawClock();
    }

   drawClock = () => {
    this.drawBack();
    this.drawNumbers();
    this.drawHand( this.state.clockminutes, this.radius*0.6, this.radius*0.04);
    this.drawHand( this.state.clockseconds, this.radius*0.9, this.radius*0.02);
  }
  
  drawBack = () => {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0 , 2*Math.PI);
    this.ctx.fillStyle = "grey";
    this.ctx.fill();
  }
  
  drawHand( pos, length, width) {
    
    this.ctx.beginPath();
    this.ctx.lineWidth = width;
    this.ctx.lineCap = "round";
    this.ctx.moveTo(0,0);
    this.ctx.rotate(pos);
    this.ctx.lineTo(0, -length);
    this.ctx.stroke();
    this.ctx.rotate(-pos);
    
  }
   drawNumbers = () => {
    var ang;
    var num;
    this.ctx.font = this.radius*0.07 + "px arial";
    this.ctx.textBaseline="middle";
    this.ctx.textAlign="center";
    this.ctx.fillStyle = "black";
    for(num = 0; num < 60; num++){
      ang = num * Math.PI / 30;
      this.ctx.rotate(ang);
      this.ctx.translate(0, -this.radius*0.95);
      this.ctx.rotate(-ang);
      this.ctx.fillText(num.toString(), 0, 0);
      this.ctx.rotate(ang);
      this.ctx.translate(0, this.radius*0.95);
      this.ctx.rotate(-ang);
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Countdown</h1>
        </header>
        <button onClick={this.start}>start</button>
        <button onClick={this.pause}>pause</button>
        <button onClick={this.reset}>reset</button>
        <div>{this.state.chrono}</div>
        <canvas ref="canvas" width={400} height={400} style={{backgroundColor: "#FFF"}}></canvas>

      </div>
    );
  }
}

export default App;
