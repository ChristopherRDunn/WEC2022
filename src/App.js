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

  onCalculationComplete = result => {
    this.setState({
      finalResult: "Result: " + result.value,
    })
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h2>Shipment Stacking Simulation</h2>
            <Form onChange={fields => this.onChange(fields)} onCalculationComplete={result => this.onCalculationComplete(result)} />
            <p>
              {this.state.finalResult}
            </p>
          </div>
        </header>
      </div>
    );
  }
}
export default App;
