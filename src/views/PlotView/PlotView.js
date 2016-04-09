import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SelectableList from 'components/SelectableList';
import Dimensions from 'react-dimensions';
// material UI
import ListItem from 'material-ui/lib/lists/list-item';
// plots
import Position from 'components/plots/Position';
import BeamPosition from 'components/plots/BeamPosition';
import RangeMetrics from 'components/plots/RangeMetrics';
import Position3D from 'components/plots/Position3D';

export class PlotView extends React.Component {
  constructor (props) {
    super();

    this.state = {
      selectedIndex: props.trackIds.first(),
      selectedField: 0,
      showFields: true,
      showTrackList: true
    };
    this.updateTrack = this.updateTrack.bind(this);
    this.updateField = this.updateField.bind(this);

    this.styles = {
      list: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        height: 'calc(100vh - 88px)'
      },
      plot: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        height: 'calc(100vh - 88px)'
      }
    };
  }

  componentDidMount () {
    window.dispatchEvent(new Event('resize'));
  }

  static propTypes = {
    params: PropTypes.object,
    data: PropTypes.object,
    trackIds: PropTypes.object,
    containerHeight: PropTypes.number,
    containerWidth: PropTypes.number
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
    const { params, data, trackIds, containerWidth, containerHeight } = this.props;
    const height = containerHeight;
    const width = containerWidth-150;
    const { selectedIndex, selectedField } = this.state;

    // get beam position data
    const beamPositionData = data.filter((row) => {
      return row.get('type') === 'beamPosition';
    });
    // get track data
    const trackData = data.filter((row) => row.get('id') === selectedIndex);

    // control which plot to display
    switch (params.plotType) {
      case 'position':
        this.state.showFields = true;
        this.state.showTrackList = true;
        this.fieldList = [
          { name: 'ECEF X', field: 'sv_ecef_x' },
          { name: 'ECEF Y', field: 'sv_ecef_y' },
          { name: 'ECEF Z', field: 'sv_ecef_z' }
        ];
        this.plot = <Position
          data={trackData}
          title={`Track ${selectedIndex} - ${this.fieldList[selectedField].name} vs Time`}
          fieldX='t_valid'
          fieldY={this.fieldList[selectedField].field}
          width={width}
          height={height}
          />;

        break;

      case 'range-metrics':
        this.state.showFields = true;
        this.state.showTrackList = true;
        this.fieldList = [
          { name: 'PD', field: 'pd' },
          { name: 'Track Quality Velocity', field: 'tq_vel' },
          { name: 'Track Quality Position', field: 'tq_pos' }
        ];
        this.plot = <RangeMetrics
          data={trackData}
          title={`Track ${selectedIndex} - ${this.fieldList[selectedField].name} vs Range`}
          fieldX='range'
          fieldY={this.fieldList[selectedField].field}
          width={width}
          height={height}
          />;
        break;

      case 'position-3d':
        this.state.showFields = false;
        this.state.showTrackList = true;
        this.plot = <Position3D
          data={trackData}
          title={`Position ECEF - Track ${selectedIndex}`}
          width={width}
          height={height}
          />;
        break;

      case 'beam-position':
        this.state.showFields = false;
        this.state.showTrackList = false;
        this.plot = <BeamPosition
          data={beamPositionData}
          title={'Beam Position'}
          width={width+100}
          height={height}
          fieldX={'azDeg'}
          fieldY={'elDeg'}
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
              selectedIndex={selectedIndex}
              >
                {
                  trackIds.map((id) => {
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
            selectedIndex={selectedField}
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
  data: state.data,
  trackIds: state.trackIds
});

export default connect(mapStateToProps)(Dimensions()(PlotView));
