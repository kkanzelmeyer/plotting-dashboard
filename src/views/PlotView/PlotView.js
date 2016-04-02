import React, { PropTypes } from 'react';
import PlotDemo from 'components/plots/PlotDemo';
import { connect } from 'react-redux';
import Position3D from 'components/plots/Position3D';
import SelectableList from 'components/SelectableList';
// material UI
import ListItem from 'material-ui/lib/lists/list-item';

export class PlotView extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedIndex: 2008
    };
    this.updatePlot = this.updatePlot.bind(this);
  }
  static propTypes = {
    params: PropTypes.object,
    data: PropTypes.object
  }

  styles = {
    list: {
      display: 'flex',
      flexDirection: 'column'
    },
    plot: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 88px)'
    }
  }

  updatePlot (selectedIndex) {
    console.debug(`updating plot ${selectedIndex}`);
    this.setState({
      selectedIndex
    });
  }

  render () {
    const { params, data } = this.props;
    const { selectedIndex } = this.state;
    // get list of ids
    const ids = data.map((row) => row.get('id')).toSet();
    console.debug(ids);

    // get all data for an id
    // TODO value should come from the list
    const filteredData = data.filter((row) => row.get('id') === selectedIndex);
    console.debug(filteredData);

    switch (params.plotType) {
      case 'plot-demo':
        this.plot = <PlotDemo />;
        break;

      case 'position-3d':
        this.plot = <Position3D
          data={filteredData}
          title={`Position ECEF - Track ${selectedIndex}`}
          />;
        break;

      default:
        break;
    }

    return (
      <div style={{
        display: 'flex'
      }}
      >
        <div>
          <SelectableList
            style={this.styles.list}
            subheader='Track ID'
            onChange={this.updatePlot}
            selectedIndex={this.state.selectedIndex}
          >
            {
              ids.map((id) => {
                return (
                  <ListItem
                    value={id}
                    key={id}
                  >
                  {id}
                  </ListItem>);
              })
            }
          </SelectableList>
        </div>
        <div idName='plotView' style={this.styles.plot}>
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
