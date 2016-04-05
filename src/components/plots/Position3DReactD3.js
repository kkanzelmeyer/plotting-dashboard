import React, { Component, PropTypes } from 'react';
import { ScatterPlot } from 'react-d3-components';

class TimeSeries extends Component {

  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string,
    field: PropTypes.string
  }

  getChartData () {
    const { data } = this.props;

    let truth = [];
    let track = [];

    data.forEach((row) => {
      let obj = {
        x: row.get('sv_ecef_x'),
        y: row.get('sv_ecef_y'),
        z: row.get('sv_ecef_z')
      };
      if (row.get('type') === 'truth') {
        truth.push(obj);
      }
      if (row.get('type') === 'track') {
        track.push(obj);
      }
    });

    return [{
      label: 'Truth',
      values: truth
    },
    {
      label: 'Track',
      values: track
    }];
  }

  render () {
    console.debug('Chart JS rendering');
    const height = 700;
    const width = 1100;
    const margins = {
      top: 70,
      bottom: 50,
      left: 50,
      right: 10
    };

    return (
      <div style={{
        backgroundColor: '#fff',
        padding: '30'
      }}
      >
        <ScatterPlot
          margin={margins}
          data={this.getChartData()}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default TimeSeries;
