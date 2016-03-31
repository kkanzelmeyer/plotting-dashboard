import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';
import { splitEvery, contains } from 'ramda';

// Component Import
import FilterToolbar from 'components/FilterToolbar';
import Call from 'components/Call';

export class CallView extends React.Component {

  static propTypes = {
    calls: PropTypes.object,
    partners: PropTypes.object
  };

  constructor (props) {
    super();
    this.state = {
      searchText: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch (searchText) {
    this.setState({
      searchText
    });
  }

  getFilteredCalls () {
    const { searchText } = this.state;
    const { calls = Map() } = this.props;
    return !searchText ? calls : calls.filter((call) =>
      contains(searchText.toLowerCase(), call.get('clientName').toLowerCase()) ||
      contains(searchText.toLowerCase(), call.get('status').toLowerCase()) ||
      (call.has('partner') && contains(searchText.toLowerCase(), call.getIn(['partner', 'name']).toLowerCase()))
    );
  }

  render () {
    const { searchText } = this.state;
    const callRows = splitEvery(4, this.getFilteredCalls().toArray());
    return (
      <div>
        <FilterToolbar
          searchText={searchText}
          onSearch={this.handleSearch}
        />
        <Infinite
          elementHeight={88}
          useWindowAsScrollContainer
        >
          {
            callRows.map((callRow) =>
              <div style={{ display: 'flex' }} key={callRow.map((call) => call.get('id')).join('-')}>
                {
                  callRow.map((call) => {
                    return (
                      <Call
                        key={call.get('id')}
                        call={call}
                      />
                    );
                  })
                }
              </div>
            )
          }
        </Infinite>
      </div>
    );
  }

}

const mapStateToProps = (state) =>
  ({
    calls: state.calls.map((call) => call.set('partner',
    state.partners.present.get(call.get('partnerId'))))
  });

export default connect(mapStateToProps)(CallView);
