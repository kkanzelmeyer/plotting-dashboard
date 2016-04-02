import React, { Component, PropTypes } from 'react';
import Plotly from 'react-plotlyjs';

class Position3D extends Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object
  }

  createPlotData () {
    const { data } = this.props;

    // filter to get truth data only
    const truthData = data.filter((row) => row.get('type') === 'truth');

    // filter to get track data only
    const trackData = data.filter((row) => row.get('type') === 'track');

    return [
      {
        type: 'scatter3d',
        x: truthData.map((row) => row.get('sv_ecef_x')).toArray(),
        y: truthData.map((row) => row.get('sv_ecef_y')).toArray(),
        z: truthData.map((row) => row.get('sv_ecef_z')).toArray(),
        mode: 'markers',
        marker: {
          size: 6,
          opacity: 0.6,
          symbol: 'dot'
        },
        name: 'Truth'
      },
      {
        type: 'scatter3d',
        x: trackData.map((row) => row.get('sv_ecef_x')).toArray(),
        y: trackData.map((row) => row.get('sv_ecef_y')).toArray(),
        z: trackData.map((row) => row.get('sv_ecef_z')).toArray(),
        mode: 'markers',
        marker: {
          size: 6,
          opacity: 0.6,
          symbol: 'dot'
        },
        name: 'Track'
      }
    ];
  }

  createLayout () {
    return {
      title: 'Position ECEF'
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

export default Position3D;
