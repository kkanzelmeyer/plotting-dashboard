import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';
import Theme from '../../helpers/theme.js';

class Position extends React.Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
    radars: PropTypes.object,
    title: PropTypes.string,
    width: PropTypes.number,
    fieldX: PropTypes.string,
    fieldY: PropTypes.string,
    height: PropTypes.number
  }

  constructor () {
    super();
    this.state = {};
  }

  componentDidMount () {
    const plotDiv = ReactDOM.findDOMNode(this);
    this.setState({
      plotDiv
    });
    Plotly.newPlot(plotDiv, this.createPlotData(this.props.data), this.createLayout());
  }

  componentWillReceiveProps (nextProps) {
    const { plotDiv } = this.state;
    this.props = nextProps;
    if (plotDiv) {
      Plotly.newPlot(plotDiv, this.createPlotData(nextProps.data), this.createLayout());
    }
  }

  createPlotData (data) {
    const { fieldX, fieldY } = this.props;
    // let radars = [];
    let truthX = [];
    let truthY = [];
    // let trackX = [];
    // let trackY = [];
    let tracks = [];

    data.forEach((row) => {
      if (row.get('type') === 'truth') {
        truthX.push(row.get(fieldX));
        truthY.push(row.get(fieldY));
      }
      if (row.get('type') === 'track') {
        tracks[row.get('radar_id', 'undefined')]['xVals'].push(row.get(fieldX));
        tracks[row.get('radar_id', 'undefined')]['yVals'].push(row.get(fieldY));
        // trackX.push(row.get(fieldX));
        // trackY.push(row.get(fieldY));
      }
    });

    let trackSeries = [];
    tracks.forEach((entry) => {

    })

    // })
    return [{
      type: 'scatter',
      x: truthX,
      y: truthY,
      mode: 'markers',
      marker: {
        color: Theme.palette.truth,
        size: 18,
        opacity: 0.6,
        symbol: 'dot',
        line: {
          opacity: 1.0,
          width: 1,
          color: Theme.palette.truth
        }
      },
      name: 'Truth'
    },
    {
      type: 'scatter',
      x: trackX,
      y: trackY,
      mode: 'markers',
      marker: {
        color: Theme.palette.track,
        size: 10,
        opacity: 0.5,
        symbol: 'diamond',
        line: {
          opacity: 1.0,
          width: 1,
          color: Theme.palette.truth
        }
      }
      // name: `Track - ${radarId}`
    }];
  }

  createLayout () {
    const { title, width, height, fieldX, fieldY } = this.props;
    return {
      title,
      width,
      height,
      xaxis: {
        title: fieldX
      },
      yaxis: {
        title: fieldY
      }
    };
  }

  config = {
    showLink: false,
    displayModeBar: true
  };

  render () {
    return (
      <div />
    );
  }
}

export default Position;
