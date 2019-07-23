import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import redux actions
import {
  forgotPasswordAction,
  forgotPasswordVerifyAction,
  forgotPasswordUpdateAction
} from '../../store/actions/authActions';

// import utils
import { isEmptyString, checkRegno } from '../../Utils/string';

// import components
import LoginHeader from '../Layouts/Headers/LoginHeader';
import { Grid } from '@material-ui/core';

class ForgotPassword extends Component {
  state = {
    // regno
    regno: null,
    isregnoError: false,
    regnoError: null,
    // otp
    otp: null,
    isOtpError: false,
    otpError: null,
    // password
    password: null,
    isPasswordError: false,
    passwordError: null,
    // confirm-password
    confirmPassword: null,
    isConfirmPasswordError: false,
    confirmPasswordError: null,
    // confirmations
    isEmailSent: false,
    isOtpConfirmed: false,
    buttonTitle: 'Send OTP',
    isPasswordChanged: false,
    // spinner flag
    spinner: false
  };

  handleOnClose = () => {
    this.setState({ isPasswordChanged: false });
    this.props.history.push('/');
  };

  handleOnregnoChange = e => {
    const currValue = e.target.value;

    if (!checkRegno(currValue))
      return this.setState({
        regno: currValue,
        isregnoError: true,
        regnoError: 'Invalid Registration Number'
      });

    this.setState({ regno: currValue, isregnoError: false, regnoError: null });
  };

  handleOnOtpChange = e => {
    this.setState({ otp: e.target.value, isOtpError: false, otpError: null });
  };

  handleOnPasswordChange = e => {
    const currValue = e.target.value;

    if (currValue.length <= 10) {
      return this.setState({
        password: currValue,
        isPasswordError: true,
        passwordError: 'Password too short. Minimum 10 characters required'
      });
    }

    this.setState({
      password: currValue,
      isPasswordError: false,
      passwordError: null
    });
  };

  handleOnConfirmPasswordChange = e => {
    const currValue = e.target.value;

    if (currValue !== this.state.password)
      return this.setState({
        confirmPassword: currValue,
        isConfirmPasswordError: true,
        confirmPasswordError: 'Passwords do not match'
      });

    this.setState({
      confirmPassword: currValue,
      isConfirmPasswordError: false,
      confirmPasswordError: null
    });
  };

  onSubmitButton = () => {
    this.setState({ spinner: true });

    const { isEmailSent, isOtpConfirmed } = this.state;

    // enable OTP confirmation
    if (false === isEmailSent) {
      const { regno, isregnoError } = this.state;

      // if some errors already exists
      if (isregnoError) return this.setState({ spinner: false });

      // check for empty field
      if (isEmptyString(regno)) {
        return this.setState({
          isregnoError: true,
          regnoError: 'Field must not be empty',
          spinner: false
        });
      }

      return this.props
        .forgotPasswordAction(regno)
        .then(() => {
          this.setState({
            isEmailSent: true,
            buttonTitle: 'Confirm OTP',
            spinner: false
          });
        })
        .catch(() => {
          this.setState({
            isregnoError: true,
            regnoError: this.props.message,
            spinner: false
          });
          setTimeout(() => {
            this.setState({
              isregnoError: false,
              regnoError: null
            });
          }, 3000);
        });
    }

    // enable password reset
    if (false === isOtpConfirmed) {
      const { otp, isOtpError } = this.state;

      // check if some errors already exists
      if (isOtpError) return this.setState({ spinner: false });

      // check for empty field
      if (isEmptyString(otp)) {
        return this.setState({
          isOtpError: true,
          otpError: 'Field must not be empty',
          spinner: false
        });
      }

      return this.props
        .forgotPasswordVerifyAction(this.props.forgotPasswordAccessToken, otp)
        .then(() => {
          this.setState({
            isOtpConfirmed: true,
            buttonTitle: 'Reset Password',
            spinner: false
          });
        })
        .catch(() => {
          this.setState({
            isOtpError: true,
            otpError: this.props.message,
            spinner: false
          });
          setTimeout(() => {
            this.setState({
              isOtpError: false,
              otpError: null
            });
          }, 3000);
        });
    }

    const {
      password,
      confirmPassword,
      isPasswordError,
      isConfirmPasswordError
    } = this.state;

    // check for already existing errors
    if (isPasswordError || isConfirmPasswordError)
      return this.setState({ spinner: false });

    // check for empty fields
    let isError = false;
    if (isEmptyString(password)) {
      isError = true;
      this.setState({
        isPasswordError: true,
        passwordError: 'Field must not be empty',
        spinner: false
      });
    }
    if (isEmptyString(confirmPassword)) {
      isError = true;
      this.setState({
        isConfirmPasswordError: true,
        confirmPasswordError: 'Field must not be empty',
        spinner: false
      });
    }

    if (isError) return this.setState({ spinner: false });

    this.props
      .forgotPasswordUpdateAction(
        this.props.forgotPasswordVerifyAccessToken,
        password
      )
      .then(() => {
        // redirect to login page, after successfully resetting the password
        this.setState({ isPasswordChanged: true, spinner: false });
        setTimeout(() => {
          this.setState({ spinner: false });
          this.props.history.push('/');
        }, 2000);
      })
      .catch(() => {
        this.setState({ spinner: false });
        // alert(this.props.message);
      });
  };

  render() {
    const {
      isEmailSent,
      isOtpConfirmed,
      buttonTitle,
      isPasswordChanged,
      isregnoError,
      regnoError,
      isOtpError,
      otpError,
      isPasswordError,
      passwordError,
      isConfirmPasswordError,
      confirmPasswordError
    } = this.state;

    return (
      <Box
        component='div'
        style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}
      >
        <LoginHeader
          history={this.props.history}
          route='/'
          title='Remember your password now? Login'
        />
        <Container>
          <Box component='div' style={{ paddingTop: 20 }}>
            <Grid container>
              <Grid item xs={0} sm={3} />
              <Grid item xs={12} sm={6}>
                <form>
                  <Paper style={{ padding: 20 }}>
                    <TextField
                      id='outlined-regno-input'
                      fullWidth
                      label='Enter Registration Number'
                      type='regno'
                      name='regno'
                      value={this.state.regno}
                      error={isregnoError}
                      helperText={regnoError}
                      disabled={isEmailSent}
                      onChange={e => this.handleOnregnoChange(e)}
                      margin='normal'
                      variant='outlined'
                    />
                    {isEmailSent ? (
                      <TextField
                        id='outlined-text-input'
                        fullWidth
                        label='Enter OTP sent to your email'
                        type='text'
                        name='otp'
                        value={this.state.otp}
                        error={isOtpError}
                        helperText={otpError}
                        onChange={e => this.handleOnOtpChange(e)}
                        disabled={isOtpConfirmed}
                        margin='normal'
                        variant='outlined'
                      />
                    ) : null}
                    {isOtpConfirmed ? (
                      <Box>
                        <TextField
                          id='outlined-password-input'
                          fullWidth
                          name='password'
                          label='Enter New Password'
                          type='password'
                          value={this.state.password}
                          error={isPasswordError}
                          helperText={passwordError}
                          onChange={e => this.handleOnPasswordChange(e)}
                          margin='normal'
                          variant='outlined'
                        />
                        <TextField
                          id='outlined-password-input'
                          fullWidth
                          name='confirmPassword'
                          label='Confirm New Password'
                          type='password'
                          value={this.state.confirmPassword}
                          error={isConfirmPasswordError}
                          helperText={confirmPasswordError}
                          onChange={e => this.handleOnConfirmPasswordChange(e)}
                          margin='normal'
                          variant='outlined'
                        />
                      </Box>
                    ) : null}
                    {this.state.spinner ? (
                      <CircularProgress color='secondary' />
                    ) : null}
                    <br />
                    <br />
                    <Button
                      onClick={() => this.onSubmitButton()}
                      variant='contained'
                      color='primary'
                      fullWidth
                    >
                      {buttonTitle}
                    </Button>
                  </Paper>
                </form>
              </Grid>
              <Grid item xs={0} sm={3} />
            </Grid>
          </Box>
          <Snackbar
            open={isPasswordChanged}
            message='Password Changed Successfully'
            autoHideDuration={2000}
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                onClick={this.handleOnClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Container>
      </Box>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPasswordAccessToken: PropTypes.string.isRequired,
  forgotPasswordVerifyAccessToken: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  forgotPasswordAction: PropTypes.func.isRequired,
  forgotPasswordVerifyAction: PropTypes.func.isRequired,
  forgotPasswordUpdateAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  forgotPasswordAccessToken: state.auth.forgotPasswordAccessToken,
  forgotPasswordVerifyAccessToken: state.auth.forgotPasswordVerifyAccessToken,
  message: state.auth.message
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      forgotPasswordAction,
      forgotPasswordVerifyAction,
      forgotPasswordUpdateAction
    }
  )(ForgotPassword)
);
