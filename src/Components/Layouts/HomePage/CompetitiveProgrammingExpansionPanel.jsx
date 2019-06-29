import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import redux actions
import {
  getCompetitiveProgrammingProfile,
  updateCompetitiveProgrammingWebsite
} from '../../../store/actions/profileActions';

import { isEmptyString } from '../../../Utils/string';
import { APP_COLOR } from '../../../constants/app';

const style = {
  color: APP_COLOR,
  fontWeight: 750
};

class CompetitiveProgrammingExpansionPanel extends Component {
  state = {
    editPreferedProgrammingLanguage: false,
    preferedLanguage: undefined,
    editCodeChef: false,
    codeChefUrl: undefined,
    editHackerearth: false,
    hackerearthUrl: undefined,
    editTopCoder: false,
    topCoderUrl: undefined,
    editGitHub: false,
    gitHubUrl: undefined,
    // snackbar props
    isError: false,
    error: undefined
  };

  componentDidMount() {
    this.props.getCompetitiveProgrammingProfile(this.props.useraccesstoken);
  }

  handleOnSubmit = fieldValue => {
    const field = this.state[fieldValue];
    if (isEmptyString(field)) {
      this.setState({ isError: true, error: 'Input Field cannot be empty' });
      return setTimeout(() => {
        this.setState({ isError: false });
      }, 3000);
    }

    let obj = {};
    obj[fieldValue] = field;

    this.props
      .updateCompetitiveProgrammingWebsite(this.props.useraccesstoken, {
        ...obj
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        this.setState({
          isError: true,
          error: 'Something Went Wrong. Try again after sometime'
        });
        return setTimeout(() => {
          this.setState({ isError: false });
        }, 3000);
      });
  };

  handleOnDelete = fieldValue => {
    const obj = {};
    obj[fieldValue] = null;

    this.props
      .updateCompetitiveProgrammingWebsite(this.props.useraccesstoken, {
        ...obj
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        this.setState({
          isError: true,
          error: 'Something Went Wrong. Try again after sometime'
        });
        return setTimeout(() => {
          this.setState({ isError: false });
        }, 3000);
      });
  };

  render() {
    const {
      preferedLanguage: preferProgrammingLanguage,
      codeChefUrl: codeChef,
      hackerearthUrl: hackerearth,
      topCoderUrl: topCoder,
      gitHubUrl: gitHub
    } = this.props.competitiveProgramming;

    const {
      editPreferedProgrammingLanguage,
      editCodeChef,
      editHackerearth,
      editTopCoder,
      editGitHub
    } = this.state;

    return (
      <ExpansionPanel elevation={2}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h5'>Competitive Programming</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
          <Typography style={{ fontSize: 17 }}>
            Prefered Programming Language(s) :{' '}
            {editPreferedProgrammingLanguage ? (
              <span>
                <TextField
                  value={this.state.preferedLanguage}
                  onChange={e =>
                    this.setState({
                      preferedLanguage: e.target.value
                    })
                  }
                />
                <IconButton
                  onClick={() => this.handleOnSubmit('preferedLanguage')}
                >
                  <DoneIcon style={{ color: 'green' }} />
                </IconButton>
                <IconButton
                  onClick={() => this.handleOnDelete('preferedLanguage')}
                >
                  <DeleteIcon style={{ color: 'yellow' }} />
                </IconButton>
                <IconButton
                  onClick={() =>
                    this.setState({ editPreferedProgrammingLanguage: false })
                  }
                >
                  <ClearIcon style={{ color: 'red' }} />
                </IconButton>
              </span>
            ) : (
              <span>
                {preferProgrammingLanguage ? (
                  <span style={{ fontFamily: 'monospace', color: 'blue' }}>
                    {preferProgrammingLanguage}
                  </span>
                ) : (
                  <span style={{ color: 'red' }}>Nil</span>
                )}
                <IconButton
                  onClick={() =>
                    this.setState({ editPreferedProgrammingLanguage: true })
                  }
                >
                  <EditIcon />
                </IconButton>
              </span>
            )}
          </Typography>
          <Typography style={{ fontSize: 17 }}>
            <span style={{ ...style }}>CodeChef</span> Profile URL :{' '}
            {editCodeChef ? (
              <span>
                <TextField
                  value={this.state.codeChefUrl}
                  onChange={e =>
                    this.setState({
                      codeChefUrl: e.target.value
                    })
                  }
                />
                <IconButton onClick={() => this.handleOnSubmit('codeChefUrl')}>
                  <DoneIcon style={{ color: 'green' }} />
                </IconButton>
                <IconButton onClick={() => this.handleOnDelete('codeChefUrl')}>
                  <DeleteIcon style={{ color: 'yellow' }} />
                </IconButton>
                <IconButton
                  onClick={() => this.setState({ editCodeChef: false })}
                >
                  <ClearIcon style={{ color: 'red' }} />
                </IconButton>
              </span>
            ) : (
              <span>
                {codeChef ? (
                  <Button
                    href={codeChef}
                    style={{ fontFamily: 'monospace', color: 'blue' }}
                  >
                    Visit Profile
                  </Button>
                ) : (
                  <span style={{ color: 'red' }}>Nil</span>
                )}
                <IconButton
                  onClick={() => this.setState({ editCodeChef: true })}
                >
                  <EditIcon />
                </IconButton>
              </span>
            )}
          </Typography>
          <Typography style={{ fontSize: 17 }}>
            <span style={{ ...style }}>Hackerearth</span> Profile URL :{' '}
            {editHackerearth ? (
              <span>
                <TextField
                  value={this.state.hackerearthUrl}
                  onChange={e =>
                    this.setState({
                      hackerearthUrl: e.target.value
                    })
                  }
                />
                <IconButton
                  onClick={() => this.handleOnSubmit('hackerearthUrl')}
                >
                  <DoneIcon style={{ color: 'green' }} />
                </IconButton>
                <IconButton
                  onClick={() => this.handleOnDelete('hackerearthUrl')}
                >
                  <DeleteIcon style={{ color: 'yellow' }} />
                </IconButton>
                <IconButton
                  onClick={() => this.setState({ editHackerearth: false })}
                >
                  <ClearIcon style={{ color: 'red' }} />
                </IconButton>
              </span>
            ) : (
              <span>
                {hackerearth ? (
                  <Button
                    href={hackerearth}
                    style={{ fontFamily: 'monospace', color: 'blue' }}
                  >
                    Visit Profile
                  </Button>
                ) : (
                  <span style={{ color: 'red' }}>Nil</span>
                )}
                <IconButton
                  onClick={() => this.setState({ editHackerearth: true })}
                >
                  <EditIcon />
                </IconButton>
              </span>
            )}
          </Typography>
          <Typography style={{ fontSize: 17 }}>
            <span style={{ ...style }}>TopCoder</span> Profile URL :{' '}
            {editTopCoder ? (
              <span>
                <TextField
                  value={this.state.topCoderUrl}
                  onChange={e =>
                    this.setState({
                      topCoderUrl: e.target.value
                    })
                  }
                />
                <IconButton onClick={() => this.handleOnSubmit('topCoderUrl')}>
                  <DoneIcon style={{ color: 'green' }} />
                </IconButton>
                <IconButton onClick={() => this.handleOnDelete('topCoderUrl')}>
                  <DeleteIcon style={{ color: 'yellow' }} />
                </IconButton>
                <IconButton
                  onClick={() => this.setState({ editTopCoder: false })}
                >
                  <ClearIcon style={{ color: 'red' }} />
                </IconButton>
              </span>
            ) : (
              <span>
                {topCoder ? (
                  <Button
                    href={topCoder}
                    style={{ fontFamily: 'monospace', color: 'blue' }}
                  >
                    Visit Profile
                  </Button>
                ) : (
                  <span style={{ color: 'red' }}>Nil</span>
                )}
                <IconButton
                  onClick={() => this.setState({ editTopCoder: true })}
                >
                  <EditIcon />
                </IconButton>
              </span>
            )}
          </Typography>
          <Typography style={{ fontSize: 17 }}>
            <span style={{ ...style }}>GitHub</span> Profile URL :{' '}
            {editGitHub ? (
              <span>
                <TextField
                  value={this.state.gitHubUrl}
                  onChange={e =>
                    this.setState({
                      gitHubUrl: e.target.value
                    })
                  }
                />
                <IconButton onClick={() => this.handleOnSubmit('gitHubUrl')}>
                  <DoneIcon style={{ color: 'green' }} />
                </IconButton>
                <IconButton onClick={() => this.handleOnDelete('gitHubUrl')}>
                  <DeleteIcon style={{ color: 'yellow' }} />
                </IconButton>
                <IconButton
                  onClick={() => this.setState({ editGitHub: false })}
                >
                  <ClearIcon style={{ color: 'red' }} />
                </IconButton>
              </span>
            ) : (
              <span>
                {gitHub ? (
                  <Button
                    href={gitHub}
                    style={{ fontFamily: 'monospace', color: 'blue' }}
                  >
                    Visit Profile
                  </Button>
                ) : (
                  <span style={{ color: 'red' }}>Nil</span>
                )}
                <IconButton onClick={() => this.setState({ editGitHub: true })}>
                  <EditIcon />
                </IconButton>
              </span>
            )}
          </Typography>
        </ExpansionPanelDetails>
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

CompetitiveProgrammingExpansionPanel.proTypes = {
  useraccesstoken: PropTypes.object.isRequired,
  getCompetitiveProgrammingProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken,
  competitiveProgramming: state.competitiveProgramming
});

export default connect(
  mapStateToProps,
  { getCompetitiveProgrammingProfile, updateCompetitiveProgrammingWebsite }
)(CompetitiveProgrammingExpansionPanel);
