import React, { Component, PropTypes } from 'react';
import { ScatterPlot } from 'react-d3-components';

class TwoAxis extends Component {

  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string,
    fieldX: PropTypes.string,
    fieldY: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }

  getChartData () {
    const { data, fieldX, fieldY } = this.props;

    let truth = [];
    let track = [];

    data.forEach((row) => {
      if (row.get(fieldX) && row.get(fieldY)) {
        let obj = {
          x: row.get(fieldX),
          y: row.get(fieldY)
        };
        if (row.get('type') === 'truth') {
          truth.push(obj);
        }
        if (row.get('type') === 'track') {
          track.push(obj);
        }
      }
    });

    if (truth.length > 0) {
      return [
        {
          label: 'Truth',
          values: truth
        },
        {
          label: 'Track',
          values: track
        }
      ];
    } else {
      return [
        {
          label: 'Track',
          values: track
        }
      ];
    }
  }

  render () {
    const { height, width } = this.props;
    const margins = {
      top: 20,
      bottom: 50,
      left: 50,
      right: 10
    };

    return (
      <div style={{
        padding: '20'
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

export default TwoAxis;
