import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';

class Position extends React.Component {

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
    if (plotDiv) {
      Plotly.newPlot(plotDiv, this.createPlotData(nextProps.data), this.createLayout());
    }
  }

  createPlotData (data) {
    const { fieldX, fieldY } = this.props;
    let truthX = [];
    let truthY = [];
    let trackX = [];
    let trackY = [];

    data.forEach((row) => {
      if (row.get('type') === 'truth') {
        truthX.push(row.get(fieldX));
        truthY.push(row.get(fieldY));
      }
      if (row.get('type') === 'track') {
        trackX.push(row.get(fieldX));
        trackY.push(row.get(fieldY));
      }
    });

    return [{
      type: 'scatter',
      x: truthX,
      y: truthY,
      mode: 'markers',
      marker: {
        size: 18,
        opacity: 0.6,
        symbol: 'dot'
      },
      name: 'Truth'
    },
    {
      type: 'scatter',
      x: trackX,
      y: trackY,
      mode: 'markers',
      marker: {
        size: 10,
        opacity: 0.6,
        symbol: 'diamond'
      },
      name: 'Track'
    }];
  }

  createLayout () {
    return {
      title: this.props.title,
      width: this.props.width,
      height: this.props.height
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
