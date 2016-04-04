import React, { Component, PropTypes } from 'react';
import Plotly from 'react-plotlyjs';

class Position3D extends Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string
  }

  createPlotData () {
    const { data } = this.props;

    let truthX = [];
    let truthY = [];
    let truthZ = [];
    let trackX = [];
    let trackY = [];
    let trackZ = [];

    data.forEach((row) => {
      if (row.get('type') === 'truth') {
        truthX.push(row.get('sv_ecef_x'));
        truthY.push(row.get('sv_ecef_y'));
        truthZ.push(row.get('sv_ecef_z'));
      }
      if (row.get('type') === 'track') {
        trackX.push(row.get('sv_ecef_x'));
        trackY.push(row.get('sv_ecef_y'));
        trackZ.push(row.get('sv_ecef_z'));
      }
    });

    return [
      {
        type: 'scatter3d',
        x: truthX,
        y: truthY,
        z: truthZ,
        mode: 'markers',
        marker: {
          size: 6,
          opacity: 0.6,
          symbol: 'diamond'
        },
        name: 'Truth'
      },
      {
        type: 'scatter3d',
        x: trackX,
        y: trackY,
        z: trackZ,
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
        style={{
          display: 'flex',
          flex: '0 0 100%'
        }}
      />
    );
  }
}

export default Position3D;
