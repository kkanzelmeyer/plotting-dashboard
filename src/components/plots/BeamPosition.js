import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';

class BeamPosition extends React.Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object,
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fieldX: PropTypes.string,
    fieldY: PropTypes.string
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
    if (plotDiv) {
      Plotly.newPlot(plotDiv, this.createPlotData(nextProps.data), this.createLayout());
    }
  }

  createPlotData (data) {
    const { fieldX, fieldY } = this.props;
    let beamX = [];
    let beamY = [];

    data.forEach((row) => {
      beamX.push(row.get(fieldX));
      beamY.push(row.get(fieldY));
    });

    return [{
      type: 'scatter',
      x: beamX,
      y: beamY,
      mode: 'markers',
      marker: {
        size: 18,
        opacity: 0.6,
        symbol: 'dot'
      },
      name: 'Beam Position'
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

export default BeamPosition;
