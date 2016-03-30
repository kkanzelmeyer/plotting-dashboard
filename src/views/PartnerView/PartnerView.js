import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePartner, savePartner, resetPartnerChanges, clearPartnerChanges } from '../../redux/modules/partners';
import Partner from 'components/Partner';

export class PartnerView extends React.Component {

  static propTypes = {
    partners: PropTypes.object,
    updatePartner: PropTypes.func,
    savePartner: PropTypes.func,
    resetPartnerChanges: PropTypes.func,
    clearPartnerChanges: PropTypes.func
  };

  get styles () {
    return {
      width: '100%',
      display: 'flex',

      '@media (min-width: 769px)': {
        width: '50%'
      },

      '@media (min-width: 1450px)': {
        width: '25%'
      }
    };
  }

  render () {
    const { partners, updatePartner, savePartner, resetPartnerChanges } = this.props;
    const styles = this.styles;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }} key={partners.map((partner) => partner.get('id')).join('-')}>
        {
          partners.toArray().map((partner) =>
            <Partner
              style={styles}
              key={partner.get('id')}
              partner={partner}
              onChange={updatePartner}
              onSave={savePartner}
              onCancel={resetPartnerChanges}
            />
          )
        }
      </div>
    );
  }

}

const mapStateToProps = (state) =>
  ({
    partners: state.partners.present
  });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updatePartner,
  savePartner,
  resetPartnerChanges,
  clearPartnerChanges
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PartnerView);
