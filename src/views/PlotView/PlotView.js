import React, { PropTypes } from 'react';
import PlotDemo from 'components/plots/PlotDemo';
import { connect } from 'react-redux';
// import Position3D from 'components/plots/Position3D';
// import _ from 'lodash';

export class PlotView extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    data: PropTypes.array
  }

  render () {
    const { params, data } = this.props;
    console.debug(data);
    console.debug(params.plotType);

    // const filteredData = _.chain(data).filter(function (row) {
    //   return row.id === params.id;
    // }).value();

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
