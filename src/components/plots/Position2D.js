import React, { Component, PropTypes } from 'react';
import Plotly from 'react-plotlyjs';

class Position2D extends Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string,
    field: PropTypes.string
  }

  createPlotData () {
    const { data, field } = this.props;
    // console.debug(data);

    // filter to get truth data only
    const truthData = data.filter((row) => row.get('type') === 'truth');
    let x = [];
    let y = [];

    truthData.map((row) => {
      x.push(row.get('t_valid'));
      y.push(row.get(field));
    });

    // filter to get track data only
    const trackData = data.filter((row) => row.get('type') === 'track');
    let x2 = [];
    let y2 = [];

    trackData.map((row) => {
      x2.push(row.get('t_valid'));
      y2.push(row.get(field));
    });

    return [
      {
        type: 'scatter',
        x: x,
        y: y,
        mode: 'markers',
        marker: {
          size: 6,
          opacity: 0.6,
          symbol: 'diamond'
        },
        name: 'Truth'
      },
      {
        type: 'scatter',
        x: x2,
        y: y2,
        mode: 'markers',
        marker: {
          size: 8,
          opacity: 0.6,
          symbol: 'dot'
        },
        name: 'Track'
      }
    ];
  }

  createLayout () {
    return {
      title: this.props.title
    };
  }

  config = {
    showLink: false,
    displayModeBar: true
  };

  render () {
    return (
      <Plotly className='position3d'
        data={this.createPlotData()}
        layout={this.createLayout()}
        config={this.config}
      />
    );
  }
}

export default Position2D;
