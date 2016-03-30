import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Radium from 'radium';
import { isArrayLike } from 'ramda';

const PartnerTitle = ({ name, color, priority }) =>
  <CardMedia
    style={{
      background: `#${color}`,
      height: 150
    }}
    overlayContentStyle={{
      background: 'rgba(0, 0, 0, 0.35)'
    }}
    overlay={
      <CardTitle
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        title={name}
      >
        <span style={{ color: '#DDD', fontSize: 18 }}>{priority ? `Priority ${priority}` : ''}</span>
      </CardTitle>
    }
  />;

class PartnerCard extends Component {

  static propTypes = {
    partner: PropTypes.object.isRequired,
    style: PropTypes.object,
    onChange: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
  };

  static defaultProps = {
    onChange: () => null
  };

  constructor () {
    super();
    this.state = {
      editMode: false
    };
    this.enableEditMode = this.enableEditMode.bind(this);
    this.partnerFieldChange = this.partnerFieldChange.bind(this);
    this.resolveWithId = this.resolveWithId.bind(this);
  }

  shouldComponentUpdate (props, state) {
    const { partner, style } = this.props;
    const { editMode } = this.state;
    return partner !== props.partner ||
      style !== props.style ||
      editMode !== state.editMode;
  }

  get styles () {
    return {
      root: {
        margin: 6,
        flexGrow: 1
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1
      }
    };
  }

  enableEditMode () {
    this.setState({
      editMode: true
    });
  }

  partnerFieldChange (field) {
    const getSetFn = isArrayLike(field) ? (partner) => partner.setIn : (partner) => partner.set;
    return (evt) => {
      const { partner, onChange } = this.props;
      onChange(getSetFn(partner).bind(partner)(field, evt.target.value));
    };
  }

  resolveWithId (func) {
    return () => {
      const { partner } = this.props;
      this.setState({
        editMode: false
      }, () => {
        func(partner.get('id'));
      });
    };
  }

  getDefaultState () {
    const { partner } = this.props;
    return (
      <Card
        style={this.styles.root}
      >
        <PartnerTitle
          name={partner.get('name')}
          priority={partner.get('priority')}
          color={partner.get('color')}
        />
        <CardText
          style={{ paddingBottom: 0 }}
        >
          <TextField
            hintText='Phone'
            floatingLabelText='Partner Phone'
            value={partner.get('phone')}
            fullWidth
            disabled
          />
        </CardText>
        <CardTitle
          subtitle={<h4>API Details</h4>}
          style={{ paddingBottom: 0, display: 'flex', alignItems: 'center' }}
          actAsExpander
          showExpandableButton
        />
        <CardText
          style={{ paddingTop: 0 }}
          expandable
        >
          <TextField
            hintText='API URL'
            floatingLabelText='URL'
            value={partner.getIn(['api', 'url'])}
            onChange={this.partnerFieldChange(['api', 'url'])}
            fullWidth
            disabled
          />
          <TextField
            hintText='HTTP Method'
            floatingLabelText='Method'
            value={partner.getIn(['api', 'method'])}
            onChange={this.partnerFieldChange(['api', 'method'])}
            fullWidth
            disabled
          />
          <TextField
            hintText='Bid Response Accessor Key'
            floatingLabelText='Bid Response Key'
            value={partner.getIn(['api', 'bidKey'])}
            onChange={this.partnerFieldChange(['api', 'bidKey'])}
            fullWidth
            disabled
          />
          <TextField
            hintText='Supported Response Accessor Key'
            floatingLabelText='Supported Response Key'
            value={partner.getIn(['api', 'supportedKey'])}
            onChange={this.partnerFieldChange(['api', 'supportedKey'])}
            fullWidth
            disabled
          />
        </CardText>
        <CardActions>
          <FlatButton
            label='Edit Partner'
            onClick={this.enableEditMode}
            primary
          />
        </CardActions>
      </Card>
    );
  }

  getEditState () {
    const { partner, onSave, onCancel } = this.props;
    return (
      <Card
        style={this.styles.root}
      >
        <CardTitle
          subtitle={<h4>Partner Details</h4>}
          style={{ paddingBottom: 0, display: 'flex', alignItems: 'center' }}
        />
        <CardText
          style={{ paddingBottom: 0, paddingTop: 0 }}
        >
          <TextField
            hintText='Name'
            floatingLabelText='Partner Name'
            value={partner.get('name')}
            onChange={this.partnerFieldChange('name')}
            fullWidth
          />
          <TextField
            hintText='Priority'
            floatingLabelText='Partner Priority'
            value={partner.get('priority')}
            onChange={this.partnerFieldChange('priority')}
            fullWidth
          />
          <TextField
            hintText='Color code (ex. FFFFFF)'
            floatingLabelText='Partner Color'
            value={partner.get('color')}
            onChange={this.partnerFieldChange('color')}
            fullWidth
          />
          <TextField
            hintText='Phone'
            floatingLabelText='Partner Phone'
            value={partner.get('phone')}
            onChange={this.partnerFieldChange('phone')}
            fullWidth
          />
        </CardText>
        <CardTitle
          subtitle={<h4>API Details</h4>}
          style={{ paddingBottom: 0, display: 'flex', alignItems: 'center' }}
        />
        <CardText
          style={{ paddingTop: 0 }}
        >
          <TextField
            hintText='API URL'
            floatingLabelText='URL'
            value={partner.getIn(['api', 'url'])}
            onChange={this.partnerFieldChange(['api', 'url'])}
            fullWidth
          />
          <TextField
            hintText='HTTP Method'
            floatingLabelText='Method'
            value={partner.getIn(['api', 'method'])}
            onChange={this.partnerFieldChange(['api', 'method'])}
            fullWidth
          />
          <TextField
            hintText='Bid Response Accessor Key'
            floatingLabelText='Bid Response Key'
            value={partner.getIn(['api', 'bidKey'])}
            onChange={this.partnerFieldChange(['api', 'bidKey'])}
            fullWidth
          />
          <TextField
            hintText='Supported Response Accessor Key'
            floatingLabelText='Supported Response Key'
            value={partner.getIn(['api', 'supportedKey'])}
            onChange={this.partnerFieldChange(['api', 'supportedKey'])}
            fullWidth
          />
        </CardText>
        <CardActions>
          <FlatButton
            label='Save Changes'
            onClick={this.resolveWithId(onSave)}
            primary
          />
          <FlatButton
            label='Cancel'
            onClick={this.resolveWithId(onCancel)}
          />
        </CardActions>
      </Card>
    );
  }

  render () {
    const { style } = this.props;
    const { editMode } = this.state;
    return (
      <div style={style}>
        {
          editMode ? this.getEditState() : this.getDefaultState()
        }
      </div>
    );
  }

};

export default Radium(PartnerCard);
