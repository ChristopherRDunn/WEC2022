import React from "react";
import { input, randomize } from './CraneCalculator';

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
          calculation: {
            randomize: true,
            process: false,
            output: false,
          }
        });
        break;
      case ("Process"):
        this.setState({
          calculation: {
            randomize: false,
            process: true,
            output: false,
          }
        });
        break;
      case ("Output"):
        this.setState({
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

    console.log(value);
    this.props.onCalculationComplete({ label: "randomize", value: value});
  };

  render() {
    return (
      <form>
        <label for="chooseCalculation">Chose operation type: </label>
        <select name="chooseCalculation" id="chooseCalculation" onChange={e => this.onSelectChange(e)}>
          <option value="Randomize">Generate Random Output</option>
          <option value="Process">Find Process from Output</option>
          <option value="Output">Find Output from Process</option>
        </select>
        <br/>
        <label for="inputConfig">Input Configuration: </label>
        <input
          name="inputConfig"
          placeholder="Input Configuration"
          value={this.state.inputConfig}
          onChange={e => this.onChange(e)}
        />
        <br />
        <label for="processConfig">Process Configuration: </label>
        <input
          name="processConfig"
          placeholder="Process Configuration"
          value={this.state.processConfig}
          onChange={e => this.onChange(e)}
          readOnly={this.state.calculation.process || this.state.calculation.randomize}
        />
        <br/>
        <label for="outputConfig">Output Configuration: </label>
        <input
          name="outputConfig"
          placeholder="Output Configuration"
          value={this.state.outputConfig}
          onChange={e => this.onChange(e)}
          readOnly={this.state.calculation.output || this.state.calculation.randomize}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
