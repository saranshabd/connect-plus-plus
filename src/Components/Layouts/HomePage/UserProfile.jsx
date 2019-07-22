import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AccountCicle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import redux actions
import { updatePublicProfile } from '../../../store/actions/profileActions';

import { APP_COLOR } from '../../../constants/app';
import { isEmptyString } from '../../../Utils/string';

class UserProfile extends Component {
  state = {
    // editing mode
    enableEditing: !this.props.searchUser,
    editBranch: false,
    branch: undefined,
    editJoiningYear: false,
    joiningYear: undefined,
    isError: false,
    error: undefined
  };

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
      .updatePublicProfile(this.props.useraccesstoken, {
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
    let firstname = null;
    let lastname = null;
    let regno = null;
    let profilePhotoVal = null;
    let branchVal = null;
    let joiningYearVal = null;

    if (!this.props.searchUser) {
      firstname = this.props.firstname;
      lastname = this.props.lastname;
      regno = this.props.regno;
      profilePhotoVal = this.props.profilePhotoUrl;
      branchVal = this.props.branch;
      joiningYearVal = this.props.joiningYear;
    } else {
      firstname = this.props.searchProfile.firstname;
      lastname = this.props.searchProfile.lastname;
      regno = this.props.searchProfile.regno;
      profilePhotoVal = this.props.searchProfile.profilePhotoUrl;
      branchVal = this.props.searchProfile.branch;
      joiningYearVal = this.props.searchProfile.joiningYear;
    }

    const { editBranch, editJoiningYear } = this.state;

    return (
      <Paper
        elevation={10}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 20,
          display: 'flex',
          marginTop: 20
        }}
      >
        {profilePhotoVal ? (
          <Avatar
            alt='Remy Sharp'
            src={profilePhotoVal}
            style={{
              margin: 10,
              width: 200,
              height: 200
            }}
          />
        ) : (
          <AccountCicle
            style={{
              color: APP_COLOR,
              margin: 10,
              width: 200,
              height: 200
            }}
          />
        )}
        <Typography variant='h4'>
          {firstname} {lastname}
        </Typography>
        <br />
        <Typography variant='h5'>{regno}</Typography>
        <br />
        <Typography variant='caption' gutterBottom style={{ fontSize: 15 }}>
          {editBranch ? (
            <span>
              <TextField
                value={this.state.branch}
                fullWidth
                onChange={e =>
                  this.setState({
                    branch: e.target.value
                  })
                }
              />
              <IconButton onClick={() => this.handleOnSubmit('branch')}>
                <DoneIcon style={{ color: 'green' }} />
              </IconButton>
              <IconButton onClick={() => this.setState({ editBranch: false })}>
                <ClearIcon style={{ color: 'red' }} />
              </IconButton>
            </span>
          ) : (
            <span>
              {branchVal ? (
                <span style={{ fontWeight: 750 }}>{branchVal}</span>
              ) : (
                <span>
                  Branch : <span style={{ color: 'red' }}>Nil</span>
                </span>
              )}
              {this.state.enableEditing ? (
                <IconButton onClick={() => this.setState({ editBranch: true })}>
                  <EditIcon />
                </IconButton>
              ) : null}
            </span>
          )}
        </Typography>
        <Typography variant='caption' gutterBottom style={{ fontSize: 15 }}>
          Joining Year :{' '}
          {editJoiningYear ? (
            <span>
              <TextField
                value={this.state.joiningYear}
                fullWidth
                onChange={e =>
                  this.setState({
                    joiningYear: e.target.value
                  })
                }
              />
              <IconButton onClick={() => this.handleOnSubmit('joiningYear')}>
                <DoneIcon style={{ color: 'green' }} />
              </IconButton>
              <IconButton
                onClick={() => this.setState({ editJoiningYear: false })}
              >
                <ClearIcon style={{ color: 'red' }} />
              </IconButton>
            </span>
          ) : (
            <span>
              {joiningYearVal ? (
                <span style={{ fontWeight: 750 }}>{joiningYearVal}</span>
              ) : (
                <span style={{ color: 'red' }}>Nil</span>
              )}
              {this.state.enableEditing ? (
                <IconButton
                  onClick={() => this.setState({ editJoiningYear: true })}
                >
                  <EditIcon />
                </IconButton>
              ) : null}
            </span>
          )}
        </Typography>
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
      </Paper>
    );
  }
}

UserProfile.propTypes = {
  useraccesstoken: PropTypes.object.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  regno: PropTypes.string.isRequired,
  profilePhotoUrl: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  joiningYear: PropTypes.string.isRequired,
  searchUser: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken,
  firstname: state.publicProfile.firstname,
  lastname: state.publicProfile.lastname,
  regno: state.publicProfile.regno,
  profilePhotoUrl: state.publicProfile.profilePhotoUrl,
  branch: state.publicProfile.branch,
  joiningYear: state.publicProfile.joiningYear,
  searchUser: state.applicationState.searchUser,
  searchProfile: state.search.public
});

export default withRouter(
  connect(
    mapStateToProps,
    { updatePublicProfile }
  )(UserProfile)
);
