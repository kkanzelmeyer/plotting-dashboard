import React, { Component } from 'react';
import Plotly from 'react-plotlyjs';

class PlotDemo extends Component {

  data = [
    {
      type: 'scatter',
      x: [1, 2, 3],
      y: [6, 2, 3],
      marker: {
        color: 'rgb(16, 32, 77)'
      }
    },
    {
      type: 'bar',
      x: [1, 2, 3],
      y: [6, 2, 3],
      name: 'bar chart example'
    }
  ];
  layout = {
    title: 'simple example',
    xaxis: {
      title: 'time'
    },
    annotations: [
      {
        text: 'simple annotation',
        x: 0,
        xref: 'paper',
        y: 0,
        yref: 'paper'
      }
    ]
  };
  config = {
    showLink: false,
    displayModeBar: true
  };

  render () {
    return (
      <Plotly className='position3d'
        data={this.data}
        layout={this.layout}
        config={this.config}
      />
    );
  }
}

export default PlotDemo;
