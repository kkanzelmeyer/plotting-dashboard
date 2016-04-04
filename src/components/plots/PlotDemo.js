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
    autosize: false,
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
    displayModeBar: false
  };

  render () {
    return (
      <Plotly className='plot-demo'
        data={this.data}
        layout={this.layout}
        config={this.config}
        style={{
          display: 'flex'
        }}
      />
    );
  }
}

export default PlotDemo;
