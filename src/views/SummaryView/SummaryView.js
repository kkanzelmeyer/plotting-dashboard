import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SummaryWidget from 'components/SummaryWidget';
import getMetrics from './SummaryMetrics';
import { bindActionCreators } from 'redux';
import { addIds } from 'redux/modules/track-ids';

export class SummaryView extends Component {
  constructor (props) {
    super();
    this.metrics = getMetrics(props.data);
    this.saveIds = this.saveIds.bind(this);
  }

  static propTypes = {
    data: PropTypes.object,
    addIds: PropTypes.func
  }

  componentWillMount () {
    this.saveIds();
  }

  saveIds () {
    const { addIds } = this.props;
    addIds(this.metrics.trackIds);
  }

  render () {
    const { trackIds, airThreats } = this.metrics;
    const threats = {
      totalThreats: {'label': 'Total Threats', 'value': trackIds.size},
      airThreats: {'label': 'Air Threats', 'value': airThreats.size}
    };
    return (
      <div style={{
        display: 'flex',
        flex: '1'
      }}>
        <SummaryWidget
          title={`${threats.totalThreats.value} Threats`}
          data={threats}
          style={{
            display: 'flex'
          }}
        />
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addIds
}, dispatch);

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryView);
