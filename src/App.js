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
      chrono: '0 : 00 : 00 : 0'
    });
    this.pause();
    
    
  } 
  
  display = () => {
    let hours = Math.floor(this.state.counter / (60 * 60 * 10));
    let minutes = Math.floor((this.state.counter / ( 60 * 10)) % 60 );
    let seconds = Math.floor((this.state.counter / 10) % 60);
    let dseconds = this.state.counter % 10;
    this.setState({
      chrono: hours + ' : ' + minutes.toString().padStart(2,'0') + ' : ' + seconds.toString().padStart(2,'0') + ' : ' + dseconds,
      counter: this.state.counter + 1
    });
    
  }
  componentDidMount = () =>{
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");
    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    this.drawClock(ctx, radius);
    }

  drawClock = (ctx, radius) => {
    ctx.arc(0, 0, radius, 0 , 2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    //https://www.w3schools.com/graphics/canvas_clock_face.asp
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
