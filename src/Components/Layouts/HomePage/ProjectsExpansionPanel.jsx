import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import redux actions
import { getProjects } from '../../../store/actions/profileActions';

class ProjectsExpansionPanel extends Component {
  componentDidMount() {
    this.props.getProjects(this.props.useraccesstoken);
  }

  render() {
    return (
      <ExpansionPanel elevation={2}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h5'>Projects</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{/* todo */}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

ProjectsExpansionPanel.propTypes = {
  useraccesstoken: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken
});

export default connect(
  mapStateToProps,
  { getProjects }
)(ProjectsExpansionPanel);
