import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import redux actions
import {
  addProjects,
  deleteProject
} from '../../../store/actions/profileActions';

import { APP_COLOR } from '../../../constants/app';
import { monthNames, years } from '../../../Utils/dataStructures';
import { containsEmptyStrings } from '../../../Utils/string';

class ProjectsExpansionPanel extends Component {
  state = {
    addProject: false,
    // add project state
    projectNameField: undefined,
    briefDescriptionField: undefined,
    gitHubUrlField: undefined,
    startingMonthField: undefined,
    startingYearField: undefined,
    isCompleted: true,
    completionMonthField: undefined,
    completionYearField: undefined,
    // snackbar state
    isError: false,
    error: undefined,
    // project to delete
    project_id: undefined,
    projectName: undefined
  };

  handleOnAddProject = () => {
    const {
      projectNameField,
      briefDescriptionField,
      gitHubUrlField,
      startingMonthField,
      startingYearField,
      isCompleted,
      completionMonthField,
      completionYearField
    } = this.state;

    if (isCompleted) {
      if (
        containsEmptyStrings([
          projectNameField,
          briefDescriptionField,
          gitHubUrlField,
          startingMonthField,
          startingYearField,
          completionMonthField,
          completionYearField
        ])
      ) {
        return this.setState({
          isError: true,
          error: 'All Input Fields are required'
        });
      }

      this.props
        .addProjects(this.props.useraccesstoken, {
          projectName: projectNameField,
          briefDescription: briefDescriptionField,
          gitHubUrl: gitHubUrlField,
          startMonth: startingMonthField,
          startYear: startingYearField,
          endMonth: completionMonthField,
          endYear: completionYearField
        })
        .then(() => {
          this.setState({ addProject: false });
          window.location.reload();
        })
        .catch(errorMessage => {
          this.setState({ isError: true, error: errorMessage });
        });
    } else {
      if (
        containsEmptyStrings([
          projectNameField,
          briefDescriptionField,
          gitHubUrlField,
          startingMonthField,
          startingYearField
        ])
      ) {
        return this.setState({
          isError: true,
          error: 'All Input Fields are required'
        });
      }
    }

    this.props
      .addProjects(this.props.useraccesstoken, {
        projectName: projectNameField,
        briefDescription: briefDescriptionField,
        gitHubUrl: gitHubUrlField,
        startMonth: startingMonthField,
        startYear: startingYearField
      })
      .then(() => {
        this.setState({ addProject: false });
        window.location.reload();
      })
      .catch(errorMessage => {
        this.setState({ isError: true, error: errorMessage });
      });
  };

  handleOnDeleteProject = (project_id, projectName) => {
    if (
      !window.confirm(
        `Are you sure, you want to delete project ${projectName}?`
      )
    )
      return;

    this.props
      .deleteProject(this.props.useraccesstoken, project_id)
      .then(() => {
        window.location.reload();
      });
  };

  render() {
    const { projects } = this.props;
    return (
      <ExpansionPanel elevation={2}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h5'>Projects</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
          <Button
            style={{ backgroundColor: APP_COLOR, color: '#fff' }}
            onClick={() => this.setState({ addProject: true })}
          >
            <AddIcon />
            Add Projects
          </Button>
          <br />
          {this.state.addProject ? (
            <span>
              <Paper>
                <IconButton
                  style={{ alignItems: 'flex-end' }}
                  onClick={() => this.setState({ addProject: false })}
                >
                  <ClearIcon style={{ color: 'red' }} />
                </IconButton>
                <br />
                <Box style={{ padding: 20 }}>
                  <TextField
                    fullWidth
                    label='Project Name'
                    value={this.state.projectNameField}
                    onChange={e =>
                      this.setState({ projectNameField: e.target.value })
                    }
                    margin='normal'
                    variant='outlined'
                  />
                  <TextField
                    fullWidth
                    multiline
                    label='Brief Description about the project'
                    value={this.state.briefDescriptionField}
                    onChange={e =>
                      this.setState({ briefDescriptionField: e.target.value })
                    }
                    margin='normal'
                    variant='outlined'
                  />
                  <TextField
                    fullWidth
                    label='GitHub URL'
                    value={this.state.gitHubUrlField}
                    onChange={e =>
                      this.setState({ gitHubUrlField: e.target.value })
                    }
                    margin='normal'
                    variant='outlined'
                  />
                  <br />
                  <br />
                  <TextField
                    select
                    label='Starting Month'
                    value={this.state.startingMonthField}
                    onChange={e =>
                      this.setState({ startingMonthField: e.target.value })
                    }
                    style={{ width: 200, marginRight: 10 }}
                    variant='outlined'
                  >
                    {monthNames().map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label='Starting Year'
                    value={this.state.startingYearField}
                    onChange={e =>
                      this.setState({ startingYearField: e.target.value })
                    }
                    style={{ width: 200 }}
                    variant='outlined'
                  >
                    {years().map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <br />
                  <Typography variant='span'>
                    Project still in Progress:{' '}
                  </Typography>
                  <Switch
                    value={this.state.isCompleted}
                    onChange={e =>
                      this.setState({
                        isCompleted: !this.state.isCompleted
                      })
                    }
                    color='primary'
                  />
                  <br />
                  <br />
                  <TextField
                    disabled={!this.state.isCompleted}
                    select
                    label='Completion Month'
                    value={this.state.completionMonthField}
                    onChange={e =>
                      this.setState({ completionMonthField: e.target.value })
                    }
                    style={{ width: 200, marginRight: 10 }}
                    variant='outlined'
                  >
                    {monthNames().map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    disabled={!this.state.isCompleted}
                    select
                    label='Completion Year'
                    value={this.state.completionYearField}
                    onChange={e =>
                      this.setState({ completionYearField: e.target.value })
                    }
                    style={{ width: 200 }}
                    variant='outlined'
                  >
                    {years().map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <br />
                  <Button
                    fullWidth
                    variant='outlined'
                    style={{ alignItems: 'flex-end', color: 'green' }}
                    onClick={() => this.handleOnAddProject()}
                  >
                    Add Project
                  </Button>
                </Box>
              </Paper>
              <br />
            </span>
          ) : null}
          {projects.map(project => {
            return (
              <span>
                <Paper
                  style={{
                    width: '100%',
                    padding: 20
                  }}
                >
                  <Grid container direction='column'>
                    <Grid container direction='row'>
                      <Grid item xs={11} sm={11}>
                        <Typography variant='h5'>
                          {project.projectName}
                        </Typography>
                        <Typography component='i' style={{ fontSize: 15 }}>
                          {project.briefDescription}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} sm={1}>
                        <IconButton
                          size='large'
                          onClick={() =>
                            this.handleOnDeleteProject(
                              project.project_id,
                              project.projectName
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <br />
                    <Link href={project.gitHubUrl} style={{ color: 'blue' }}>
                      See code on GitHub
                    </Link>
                    <br />
                    <Typography>
                      ({project.startTime} -{' '}
                      {project.endTime !== 'undefined, undefined'
                        ? project.endTime
                        : 'In Progress'}
                      )
                    </Typography>
                  </Grid>
                </Paper>
                <br />
              </span>
            );
          })}
        </ExpansionPanelDetails>
        {/* error messages */}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          key={`vertical,horizontal`}
          open={this.state.isError}
          onClose={() => this.setState({ isError: false })}
          message={this.state.error}
          action={
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={() => this.setState({ isError: false })}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </ExpansionPanel>
    );
  }
}

ProjectsExpansionPanel.propTypes = {
  useraccesstoken: PropTypes.object.isRequired,
  project: PropTypes.array.isRequired,
  addProjects: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken,
  projects: state.projects.projects
});

export default connect(
  mapStateToProps,
  { addProjects, deleteProject }
)(ProjectsExpansionPanel);
