import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SelectableList from 'components/SelectableList';
// material UI
import ListItem from 'material-ui/lib/lists/list-item';
// plots
import TwoAxis from 'components/plots/TwoAxis';
import Pos3D from 'components/plots/Pos3D';

export class PlotView extends React.Component {
  constructor (props) {
    super();
    const { data } = props;
    // get list of ids
    this.ids = data.map((row) => row.get('id')).toSet().sort();

    this.state = {
      selectedIndex: this.ids.first(),
      selectedField: 0,
      showFields: true,
      showTrackList: true
    };
    this.updateTrack = this.updateTrack.bind(this);
    this.updateField = this.updateField.bind(this);

    this.styles = {
      list: {
        display: 'flex',
        flex: '1 0 0',
        flexDirection: 'column',
        height: 'calc(100vh - 88px)'
      },
      plot: {
        display: 'flex',
        flex: '9 0 0',
        flexDirection: 'column',
        height: 'calc(100vh - 88px)'
      }
    };
  }

  static propTypes = {
    params: PropTypes.object,
    data: PropTypes.object
  }

  /**
   * Called when a track is selected from the track list. This method
   * updates the state object with the selected track index
   * @param  {[number]} selectedIndex the selected track id index
   */
  updateTrack (selectedIndex) {
    this.setState({
      selectedIndex
    });
  }

  /**
   * Called when a field is selected from the field list. This method
   * updates the state object with the selected field
   * @param  {[number]} selectedField the selected field index
   */
  updateField (selectedField) {
    this.setState({
      selectedField
    });
  }

  /**
   * This method renders the object for React to display
   * @return {[jsx]} the element for React to render
   */
  render () {
    const { params, data } = this.props;
    const { selectedIndex, selectedField } = this.state;

    // get all data for an id
    const filteredData = data.filter((row) => row.get('id') === selectedIndex);

    // control which plot to display
    switch (params.plotType) {
      case 'time-series':
        this.state.showFields = true;
        this.state.showTrackList = true;
        this.fieldList = [
          {
            name: 'ECEF X',
            field: 'sv_ecef_x'
          },
          {
            name: 'ECEF Y',
            field: 'sv_ecef_y'
          },
          {
            name: 'ECEF Z',
            field: 'sv_ecef_z'
          }
        ];
        this.plot = <TwoAxis
          data={filteredData}
          fieldX='t_valid'
          fieldY={this.fieldList[selectedField].field}
          />;

        break;

      case 'range-metrics':
        this.state.showFields = true;
        this.state.showTrackList = true;
        this.fieldList = [
          {
            name: 'PD',
            field: 'pd'
          },
          {
            name: 'Track Quality Velocity',
            field: 'tq_vel'
          },
          {
            name: 'Track Quality Position',
            field: 'tq_pos'
          }
        ];
        this.plot = <TwoAxis
          data={filteredData}
          fieldX='range'
          fieldY={this.fieldList[selectedField].field}
          />;
        break;

      case 'position-3d':
        this.state.showFields = false;
        this.state.showTrackList = true;
        this.plot = <Pos3D
          data={filteredData}
          title={`Position ECEF - Track ${selectedIndex}`}
          />;
        break;

      default:
        break;
    }

    return (
      <div style={{
        display: 'flex',
        flex: '1 1 auto',
        backgroundColor: '#fff'
      }}
      >
        <div>
          {this.state.showTrackList
            ? <SelectableList
              style={this.styles.list}
              subheader='Track ID'
              onChange={this.updateTrack}
              selectedIndex={this.state.selectedIndex}
              >
                {
                  this.ids.map((id) => {
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
            onChange={this.updateField}
            selectedIndex={this.state.selectedField}
          >{
            this.fieldList.map((field, i) => {
              return <ListItem value={i} key={field.field}>{field.name}</ListItem>;
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
