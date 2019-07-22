import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import GradeIcon from '@material-ui/icons/Grade';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import Redux actions
import {
  deleteTechUsed,
  addTechUsed
} from '../../../store/actions/profileActions';

import { APP_COLOR } from '../../../constants/app';
import { containsEmptyStrings } from '../../../Utils/string';
import { years, levelOfKnowledge } from '../../../Utils/dataStructures';

class TechUsedExpansionPanel extends Component {
  state = {
    // editing mode
    enableEditing: !this.props.searchUser,
    // add tech state
    addTech: false,
    techNameField: undefined,
    learningYearField: undefined,
    stillUseItField: false,
    levelField: undefined,
    sourceNameField: undefined,
    sourceUrlField: undefined,
    // snackbar state
    isError: false,
    error: undefined
  };

  handleOnAddTech = () => {
    const {
      techNameField,
      learningYearField,
      stillUseItField,
      levelField,
      sourceNameField,
      sourceUrlField
    } = this.state;

    if (
      containsEmptyStrings([
        techNameField,
        learningYearField,
        levelField,
        sourceNameField,
        sourceUrlField
      ])
    ) {
      this.setState({ isError: true, error: 'All Input fields are required' });
    }

    this.props
      .addTechUsed(this.props.useraccesstoken, {
        techName: techNameField,
        learningYear: learningYearField,
        stillUseIt: stillUseItField,
        level: levelField,
        sourceName: sourceNameField,
        sourceUrl: sourceUrlField
      })
      .then(() => window.location.reload())
      .catch(() =>
        this.setState({
          isError: true,
          error: 'Something went wrong. Please try again after sometime.'
        })
      );
  };

  handleOnDeleteTech = (tech_id, techName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${techName} from your profile?`
      )
    )
      return;

    this.props
      .deleteTechUsed(this.props.useraccesstoken, tech_id)
      .then(() => {
        window.location.reload();
      })
      .catch(() =>
        this.setState({
          isError: true,
          error: 'Something went wrong. Please try again after sometime'
        })
      );
  };

  render() {
    let techs = [];
    if (!this.props.searchUser) {
      techs = this.props.techs;
    } else {
      techs = this.props.searchTechs;
    }

    return (
      <ExpansionPanel elevation={2}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h5'>Technologies Used</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
          {this.state.enableEditing ? (
            <Button
              style={{ backgroundColor: APP_COLOR, color: '#fff' }}
              onClick={() => this.setState({ addTech: true })}
            >
              <AddIcon />
              Add Tech
            </Button>
          ) : null}
          {this.state.addTech ? (
            <span>
              <br />
              <Paper>
                <IconButton
                  style={{ alignItems: 'flex-end' }}
                  onClick={() => this.setState({ addTech: false })}
                >
                  <ClearIcon style={{ color: 'red' }} />
                </IconButton>
                <br />
                <Box style={{ padding: 20 }}>
                  <TextField
                    fullWidth
                    label='Technology Name'
                    value={this.state.techNameField}
                    onChange={e =>
                      this.setState({ techNameField: e.target.value })
                    }
                    margin='normal'
                    variant='outlined'
                  />
                  <br />
                  <TextField
                    select
                    label='Level of Knowledge'
                    value={this.state.levelField}
                    onChange={e =>
                      this.setState({ levelField: e.target.value })
                    }
                    style={{ width: 200 }}
                    variant='outlined'
                  >
                    {levelOfKnowledge().map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <br />
                  <TextField
                    select
                    label='Learning Year'
                    value={this.state.learningYearField}
                    onChange={e =>
                      this.setState({ learningYearField: e.target.value })
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
                  <TextField
                    fullWidth
                    multiline
                    label='Learning Resource Name'
                    value={this.state.sourceNameField}
                    onChange={e =>
                      this.setState({ sourceNameField: e.target.value })
                    }
                    margin='normal'
                    variant='outlined'
                  />
                  <TextField
                    fullWidth
                    label='Learning Resource URL'
                    value={this.state.sourceUrlField}
                    onChange={e =>
                      this.setState({ sourceUrlField: e.target.value })
                    }
                    margin='normal'
                    variant='outlined'
                  />
                  <br />
                  <br />
                  <Typography variant='span'>Still Use It? </Typography>
                  <Switch
                    value={this.state.stillUseItField}
                    onChange={e =>
                      this.setState({
                        stillUseItField: !this.state.stillUseItField
                      })
                    }
                    color='primary'
                  />
                  <Button
                    fullWidth
                    variant='outlined'
                    style={{ alignItems: 'flex-end', color: 'green' }}
                    onClick={() => this.handleOnAddTech()}
                  >
                    Add Tech
                  </Button>
                </Box>
              </Paper>
              <br />
            </span>
          ) : null}
          {techs.map(tech => {
            return (
              <span>
                <br />
                <Paper
                  style={{
                    width: '100%',
                    padding: 20
                  }}
                >
                  <Grid container direction='column'>
                    <Grid container direction='row'>
                      <Grid item xs={11} sm={11}>
                        <Typography variant='h5'>{tech.techName}</Typography>
                      </Grid>
                      <Grid item xs={1} sm={1}>
                        {this.state.enableEditing ? (
                          <IconButton
                            size='large'
                            onClick={() =>
                              this.handleOnDeleteTech(
                                tech.tech_id,
                                tech.techName
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Typography component='span'>
                      <Chip
                        label={
                          tech.level === 5 ? (
                            <span>
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                            </span>
                          ) : tech.level === 4 ? (
                            <span>
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon />
                            </span>
                          ) : tech.level === 3 ? (
                            <span>
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon />
                              <GradeIcon />
                            </span>
                          ) : tech.level === 2 ? (
                            <span>
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon />
                              <GradeIcon />
                              <GradeIcon />
                            </span>
                          ) : (
                            <span>
                              <GradeIcon style={{ color: 'gold' }} />
                              <GradeIcon />
                              <GradeIcon />
                              <GradeIcon />
                              <GradeIcon />
                            </span>
                          )
                        }
                        style={{ margin: 5, backgroundColor: '#f5f5f5' }}
                      />
                    </Typography>
                    <br />
                    <Typography>
                      {tech.learningYear} -{' '}
                      {tech.stillUseIt
                        ? 'Still Use it'
                        : "Don't use this anymore"}
                    </Typography>
                    <br />
                    <span>
                      Learning Resource(s):
                      <Button
                        href={tech.sourceUrl}
                        style={{ fontSize: 14, color: 'blue' }}
                      >
                        {tech.sourceName}
                      </Button>
                    </span>
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

TechUsedExpansionPanel.propTypes = {
  useraccesstoken: PropTypes.object.isRequired,
  searchUser: PropTypes.bool.isRequired,
  techs: PropTypes.array.isRequired,
  deleteTechUsed: PropTypes.func.isRequired,
  searchTechs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken,
  searchUser: state.applicationState.searchUser,
  techs: state.techUsed.techs,
  searchTechs: state.search.techs
});

export default withRouter(
  connect(
    mapStateToProps,
    { deleteTechUsed, addTechUsed }
  )(TechUsedExpansionPanel)
);
