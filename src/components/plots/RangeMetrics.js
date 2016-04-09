import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';

class RangeMetrics extends React.Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
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
    let trackX = [];
    let trackY = [];

    data.forEach((row) => {
      if (row.has(fieldX) && row.has(fieldY)) {
        trackX.push(row.get(fieldX));
        trackY.push(row.get(fieldY));
      }
    });

    return [{
      type: 'scatter',
      x: trackX,
      y: trackY,
      mode: 'markers',
      marker: {
        size: 14,
        opacity: 0.6,
        symbol: 'diamond'
      },
      name: 'Track'
    }];
  }

  createLayout () {
    const { title, width, height, fieldY, fieldX } = this.props;
    return {
      title,
      width,
      height,
      yaxis: {
        title: fieldY
      },
      xaxis: {
        title: fieldX
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

export default RangeMetrics;
