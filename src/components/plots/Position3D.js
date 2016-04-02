import React, { Component, PropTypes } from 'react';
import Plotly from 'react-plotlyjs';
import _ from 'lodash';

class Position3D extends Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
    id: PropTypes.object
  }

  createPlotData () {
    const { data } = this.props;

    // filter to get truth data only
    const truthData = _.chain(data).filter(function (row) {
      return row.type === 'truth';
    }).value();

    // filter to get track data only
    const trackData = _.chain(data).filter(function (row) {
      return row.type === 'track';
    }).value();

    return [
      {
        type: 'scatter',
        x: _.chain(truthData).map('sv_ecef_x').value(),
        y: _.chain(truthData).map('sv_ecef_y').value(),
        z: _.chain(truthData).map('sv_ecef_z').value(),
        mode: 'markers',
        marker: {
          size: 6,
          opacity: 0.6,
          symbol: 'dot'
        },
        name: 'Truth'
      },
      {
        type: 'scatter',
        x: _.chain(trackData).map('sv_ecef_x').value(),
        y: _.chain(trackData).map('sv_ecef_y').value(),
        z: _.chain(trackData).map('sv_ecef_z').value(),
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
    const { id } = this.props;
    return {
      title: `Position ECEF - Track ${id}`
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
