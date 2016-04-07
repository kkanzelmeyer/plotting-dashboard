import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SummaryWidget from 'components/SummaryWidget';
import getMetrics from './SummaryMetrics';

export class SummaryView extends Component {

  static propTypes = {
    data: PropTypes.object
  }

  render () {
    const { data } = this.props;
    const metrics = getMetrics(data);
    const { totalThreats, airThreats } = metrics;
    const threats = {
      totalThreats: {'label': 'Total Threats', 'value': totalThreats},
      airThreats: {'label': 'Air Threats', 'value': airThreats}
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

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(SummaryView);
