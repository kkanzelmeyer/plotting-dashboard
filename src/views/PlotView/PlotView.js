import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SelectableList from 'components/SelectableList';
// material UI
import ListItem from 'material-ui/lib/lists/list-item';
// plots
import PlotDemo from 'components/plots/PlotDemo';
import Position3D from 'components/plots/Position3D';
import Position2D from 'components/plots/Position2D';

export class PlotView extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedIndex: 2008,
      selectedField: 'sv_ecef_x'
    };
    this.updatePlot = this.updatePlot.bind(this);
    this.updatePlotField = this.updatePlotField.bind(this);
    this.state.showFields = true;
    this.state.showTrackList = true;

    this.positionFields = [
      'sv_ecef_x',
      'sv_ecef_y',
      'sv_ecef_z'
    ];

    this.styles = {
      list: {
        display: 'flex',
        flexDirection: 'column'
      },
      plot: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 88px)'
      }
    };
  }
  static propTypes = {
    params: PropTypes.object,
    data: PropTypes.object
  }

  updatePlot (selectedIndex) {
    console.debug(`Selected Id: ${selectedIndex}`);
    this.setState({
      selectedIndex
    });
  }

  updatePlotField (selectedField) {
    console.debug(`Selected Field: ${selectedField}`);
    this.setState({
      selectedField
    });
  }

  render () {
    const { params, data } = this.props;
    const { selectedIndex, selectedField } = this.state;
    // get list of ids
    const ids = data.map((row) => row.get('id')).toSet();

    // get all data for an id
    const filteredData = data.filter((row) => row.get('id') === selectedIndex);

    switch (params.plotType) {
      case 'plot-demo':
        this.state.showFields = false;
        this.state.showTrackList = false;
        this.plot = <PlotDemo />;
        break;

      case 'position-3d':
        this.state.showFields = false;
        this.state.showTrackList = true;
        this.plot = <Position3D
          data={filteredData}
          title={`Position ECEF - Track ${selectedIndex}`}
          />;
        break;

      case 'position-2d':
        this.state.showFields = true;
        this.state.showTrackList = true;
        this.plot = <Position2D
          data={filteredData}
          title={`Position ECEF - Track ${selectedIndex}`}
          field={selectedField}
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
          {this.state.showTrackList
            ? <SelectableList
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
            : null}
        </div>
        <div idName='plotView' style={this.styles.plot}>
          {this.plot}
        </div>
        <div>
          {this.state.showFields
          ? <SelectableList
            style={this.styles.list}
            subheader='Field'
            onChange={this.updatePlotField}
            selectedIndex={this.state.selectedField}
          >{
            this.positionFields.map((field) => {
              const prettyPrint = field.replace(/[_]/g, ' ').toUpperCase();
              return <ListItem value={field} key={field}>{prettyPrint}</ListItem>;
            })
            }
          </SelectableList>
          : null}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(PlotView);
