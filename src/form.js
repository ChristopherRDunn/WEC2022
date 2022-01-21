import React from "react";
import CraneCalculator from './CraneCalculator';

export default class form extends React.Component {
  state = {
    inputConfig: "",
    processConfig: "",
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    CraneCalculator.input(this.state);
    // this.props.onSubmit(this.state);
    this.setState({
      inputConfig: "",
      processConfig: "",
    });
    this.props.onChange({
      inputConfig: "",
      processConfig: "",
    });
  };

  render() {
    return (
      <form>
        <input
          name="inputConfig"
          placeholder="Input Configuration"
          value={this.state.inputConfig}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="processConfig"
          placeholder="Process Configuration"
          value={this.state.processConfig}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
