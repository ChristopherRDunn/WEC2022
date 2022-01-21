import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import Form from "./form";


class App extends Component {
  state = {
    fields: {}
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {  
  return (
    <div className="App">
      <header className="App-header">
        <Form onChange={fields => this.onChange(fields)} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          {JSON.stringify(this.state.fields, null, 2)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
