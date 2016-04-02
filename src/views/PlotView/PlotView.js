import React, { PropTypes } from 'react';
import PlotDemo from 'components/plots/PlotDemo';
import { connect } from 'react-redux';
import Position3D from 'components/plots/Position3D';
import SelectableList from 'components/SelectableList';
// material UI
import ListItem from 'material-ui/lib/lists/list-item';

export class PlotView extends React.Component {

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

  render () {
    const { params, data } = this.props;

    // get list of ids
    const ids = data.map((row) => row.get('id')).toSet();
    console.debug(ids);

    // get all data for an id
    // TODO value should come from the list
    const selected = 2008;
    const filteredData = data.filter((row) => row.get('id') === selected);
    console.debug(filteredData);

    switch (params.plotType) {
      case 'plot-demo':
        this.plot = <PlotDemo />;
        break;

      case 'position-3d':
        this.plot = <Position3D
          data={filteredData}
          id={selected}
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
