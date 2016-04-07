import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SummaryWidget from 'components/SummaryWidget';
import getMetrics from './SummaryMetrics';
import { bindActionCreators } from 'redux';
import { addIds } from 'redux/modules/track-ids';

export class SummaryView extends Component {
  constructor (props) {
    const { data, addIds } = props;
    super();
    this.metrics = getMetrics(data);
    addIds(this.metrics.trackIds);
  }

  static propTypes = {
    data: PropTypes.object,
    addIds: PropTypes.func
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
          title='Scenario Threats'
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
