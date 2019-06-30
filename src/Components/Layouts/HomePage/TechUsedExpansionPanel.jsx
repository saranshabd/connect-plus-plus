import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TechUsedExpansionPanel extends Component {
  render() {
    return (
      <ExpansionPanel elevation={2}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h5'>Technologies Used</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

TechUsedExpansionPanel.propTypes = {
  useraccesstoken: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken
});

export default connect(
  mapStateToProps,
  null
)(TechUsedExpansionPanel);
