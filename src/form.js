import React from "react";
import { input, randomize } from './CraneCalculator';
import "./form.css";

export default class form extends React.Component {
  defaultState = {
    inputConfig: "",
    processConfig: "",
    outputConfig: "",
    calculation: {
      randomize: true,
      process: false,
      output: false,
    },
  };

  state = this.defaultState;

  onChange = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSelectChange = e => {
    switch (e.target.value) {
      case ("Randomize"):
        this.setState({
          processConfig: "",
          outputConfig: "",
          calculation: {
            randomize: true,
            process: false,
            output: false,
          }
        });
        
        break;
      case ("Process"):
        this.setState({
          processConfig: "",
          calculation: {
            randomize: false,
            process: true,
            output: false,
          }
        });
        break;
      case ("Output"):
        this.setState({
          outputConfig: "",
          calculation: {
            randomize: false,
            process: false,
            output: true,
          }
        });
        break;
      default:
    }
  };

  onSubmit = e => {
    e.preventDefault();
    let value;
    if (this.state.calculation.randomize) {
      console.log()
      value = randomize(this.state.inputConfig);
    } else {
      value = input(this.state.inputConfig, this.state.processConfig, this.state.outputConfig);
    }

    this.props.onCalculationComplete({ label: "randomize", value: value});
  };

  render() {
    return (
      <form>
        <label className="label" for="chooseCalculation">Chose operation type: </label>
        <select 
          className="select" name="chooseCalculation" id="chooseCalculation" onChange={e => this.onSelectChange(e)}>
          <option value="Randomize">Generate Random Output</option>
          <option value="Output">Given Process find Output</option>
          <option value="Process">Given Output find Process</option>
        </select>
        <br/>
        <label className="label" for="inputConfig">Input Configuration: </label>
        <input
          name="inputConfig"
          className="value" 
          placeholder="Input Configuration"
          value={this.state.inputConfig}
          onChange={e => this.onChange(e)}
        />
        <br/>
        <label className="label" for="processConfig">Process Configuration: </label>
        <input
          name="processConfig"
          className="value" 
          placeholder="Process Configuration"
          value={this.state.processConfig}
          onChange={e => this.onChange(e)}
          readOnly={this.state.calculation.process || this.state.calculation.randomize}
        />
        <br/>
        <label className="label" for="outputConfig">Output Configuration: </label>
        <input
          name="outputConfig"
          className="value"
          placeholder="Output Configuration"
          value={this.state.outputConfig}
          onChange={e => this.onChange(e)}
          readOnly={this.state.calculation.output || this.state.calculation.randomize}
        />
        <br/>
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
