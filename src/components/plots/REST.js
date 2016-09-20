import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import ReactDOM from 'react-dom';
import Plotly from 'plotly.js';
// import Theme from '../../helpers/theme.js';
import { connect } from 'react-redux';
import RESTData from 'static/bench-rest-results.json';

class Position extends React.Component {

  // data should be an array of track and truth data
  // filtered by a track id
  static propTypes = {
    data: PropTypes.object
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
    // let delta;
    const names = [];
    const medians = [];
    const means = [];
    const results = [];
    const restData = fromJS(RESTData);
    restData.forEach(row => {
      names.push(row.get('name'));
      const obj = row.toJS();
      means.push(obj.data.main.histogram.mean); medians.push(obj.data.main.histogram.median);
    });
    restData.forEach(row => {
      const obj = row.toJS();
      const y = [obj.data.main.histogram.mean, obj.data.main.histogram.median];
      console.debug(y);
      results.push({
        type: 'bar',
        x: names,
        y,
        name: row.get('name'),
        opacity: 0.5
      });
    });

    return [
      {
        type: 'bar',
        x: names,
        y: means,
        name: 'Mean',
        opacity: 0.5
      },
      {
        type: 'bar',
        x: names,
        y: medians,
        name: 'Median',
        opacity: 0.5
      }
    ];
  }

  createLayout () {
    return {
      title: 'REST Load Times',
      height: '860',
      width: '1480',
      font: {
        size: 20
      },
      yaxis: {
        title: 'Time (ms)'
      },
      barmode: 'group'
    };
  }

  config = {
    showLink: false
    // displayModeBar: true
  };

  render () {
    return (
      <div />
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(Position);
