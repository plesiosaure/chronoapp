import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      running: null,
    }
  }
  start = () => {
    this.setState({
      running: setInterval(this.increment, 100)
    });
  }
  increment = () => {
    this.setState({
      counter: this.state.counter + 1
    });
    
  }
  pause = () => {
    clearInterval(this.state.running);
  }
  reset = () => {
    this.setState({
      counter: 0
    });
    
  } 
  display = () => {
    let hours = this.state.counter % (60 * 60 * 10);
    let minutes = this.state.counter %  60 * 10);
    let seconds = this.state.counter % (10);
    let dseconds = ;
    return this.state.counter
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
        <div>{this.display()}</div>
      </div>
    );
  }
}

export default App;
