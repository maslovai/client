//credit goes to Swizec Teller for writing this component.
//see more from them at swizec.com

import React, { Component } from 'react';

import { LabeledArc } from './arc.js';

class Piechart extends Component {
    constructor(props) {
      super(props);

      this.pie = d3.layout.pie().value(d => d.value)
      this.colors = d3.scale.category10();
    }

    //returns a LabeledArc component which accepts input
    //from props.
    arcGenerator(d, i) {
      return (
        <LabeledArc key = {`arc-${i}`}
                    data = {d}
                    innerRadius = {this.props.innerRadius}
                    outerRadius = {this.props.outerRadius}
                    color = {this.colors(i)} />
      );
    }

    render() {
      let pie = this.pie(this.props.data),
        translate = `translate(${this.props.x}, ${this.props.y})`

      return (
        <g transform = {translate}>
          {pie.map(d, i => this.arcGenerator(d, i))}
        </g>
      )

    }
}

export default Piechart;
