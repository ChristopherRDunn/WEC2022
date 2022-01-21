import React from "react";
import CraneCalculator from './CraneCalculator';

export default class form extends React.Component {
  defaultState = {
    inputConfig: "",
    processConfig: "",
    outputConfig: "",
    readOnlyInputs: {
      input: true,
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
      case ("Input"):
        this.setState({
          readOnlyInputs: {
            input: true,
            process: false,
            output: false,
          }
        });
        break;
      case ("Process"):
        this.setState({
          readOnlyInputs: {
            input: false,
            process: true,
            output: false,
          }
        });
        break;
      case ("Output"):
        this.setState({
          readOnlyInputs: {
            input: false,
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
    console.log(e)
    console.log(this.state)
    const value = CraneCalculator.input(this.state.inputConfig, this.state.processConfig, this.state.outputConfig);
    this.setState(this.defaultState);
    this.props.onCalculationComplete({ label: "input", value: value});
  };

  render() {
    return (
      <form>
        <select name="chooseCalculation" id="chooseCalculation" onChange={e => this.onSelectChange(e)}>
          <option value="Input">Find Input</option>
          <option value="Process">Find Process</option>
          <option value="Output">Find Output</option>
        </select>
        <br/>
        <input
          name="inputConfig"
          placeholder="Input Configuration"
          value={this.state.inputConfig}
          onChange={e => this.onChange(e)}
          readOnly={this.state.readOnlyInputs.input}
        />
        <br />
        <input
          name="processConfig"
          placeholder="Process Configuration"
          value={this.state.processConfig}
          onChange={e => this.onChange(e)}
          readOnly={this.state.readOnlyInputs.process}
        />
        <br/>
        <input
          name="outputConfig"
          placeholder="Output Configuration"
          value={this.state.outputConfig}
          onChange={e => this.onChange(e)}
          readOnly={this.state.readOnlyInputs.output}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
