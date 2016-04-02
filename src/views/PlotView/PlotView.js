import React, { PropTypes } from 'react';
import PlotDemo from 'components/plots/PlotDemo';
import { connect } from 'react-redux';
// import Position3D from 'components/plots/Position3D';
import _ from 'lodash';

export class PlotView extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    data: PropTypes.object
  }

  render () {
    const { params, data } = this.props;

    const filteredData = _.chain(data.toArray()).filter(function (row) {
      return row.contains(2008, 'id');
    }).value();

    // Why doesn't this work?
    // const filteredData = _.filter(data.toArray(), function (row) {
    //   return _.matchesProperty('id', 2008);
    // });
    console.debug(filteredData);

    switch (params.plotType) {
      case 'plot-demo':
        this.plot = <PlotDemo />;
        break;

      // case 'position-3d':
      //   this.plot = <Position3D
      //     data={filteredData}
      //     id={params.id}
      //     />;
      //   break;

      default:
        break;
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 88px)'
        }}
      >
        <div idName='plotView'>
          {this.plot}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(PlotView);
