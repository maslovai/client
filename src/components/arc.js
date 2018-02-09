//credit goes to Swizec Teller for writing this component.
//see more from them at swizec.com

import React, { Component } from 'react';
import d3 from 'd3';

class Arc extends Component {
    constructor() {
        super();

          //draws arcs using SVG so we don't have to
        this.arc = d3.svg.arc();
    }

    componentWillMount() {
        this.updateD3(this.props);
    }1

    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }

    //using some arc methods to update the chart using d3
    updateD3(newProps) {
      this.arc.innerRadius(newProps.innerRadius);
      this.arc.outerRadius(newprops.outerRadius);
    }

    render() {
      return(
        <path d={this.arc(this.props.data)}
          style={{fill:this.props.color}}>
        </path>
      )
    }
}

class LabeledArc extends Arc {
    render() {
        let [labelX, labelY] = this.arc.centroid(this.props.data),
            labelTranslate = `translate(${labelX}, ${labelY})`;

        return (
            <g>
                {super.render()}
                <text transform={labelTranslate}
                      textAnchor="middle">
                    {this.props.data.data.label}
                </text>
            </g>
        );
    }
}

export default Arc;
export { LabeledArc };
