import MarchingSquaresJS from "./MarchingSquares.js";
import {assoc} from "ramda";
import metropolisHastings from "./metropolis.js";
import drawPath from "./drawPath.js";
import Rosenbrock from "./Rosenbrock.js";
import DrawMetroPath from "./DrawMetroPath.js";
import drawCircle from "./drawCircle.js";
import NumberEditor from "react-number-editor";
import MetroPath from "./MetroPath.js";
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CardContainer from "./CardContainer.js";
import AutoSize from "./AutoSize.js";
import "./interpolate";

export default class MetroDistControls extends Component {
  constructor () {
    super();
    this.state = { numPoints: 300, iterations: 1000 };
    this.updateIterations = this.updateIterations.bind(this);
  }

  static propTypes = {
    size: PropTypes.number.isRequired,
    xDomain: PropTypes.array.isRequired,
    yDomain: PropTypes.array.isRequired
  };

  updateIterations(iterations)  {
    this.setState({iterations: iterations});
  };

  render() {
    const { numPoints, iterations } = this.state;
    const { xDomain, yDomain, size } = this.props;
    return (
        <CardContainer title="Metropolis-Hastings distribution" subtitle="Rosenbrock function " width={560}>
          <div ref={this.draw}></div>
          <br></br>
          <NumberEditor
            step={1000}
            value={iterations}
            min={5000}
            onValueChange={this.updateIterations}
            style={{width: "5em", marginRight: "2em"}}
            max={100000}
            label="Iterations"
            decimals={0}
          />

          <MetroPath
            size={size}
            numPoints={numPoints}
            xDomain={xDomain}
            yDomain={yDomain}
            iterations={iterations}
          />
        </CardContainer>
    );

  }

}

