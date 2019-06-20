import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// import utils
import { isEmptyString, validateEmail } from '../../Utils/string';

// import components
import LoginHeader from '../Layouts/Headers/LoginHeader';

class ForgotPassword extends Component {
  state = {
    // email
    email: null,
    isEmailError: false,
    emailError: null,
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
    isPasswordChanged: false
  };

  handleOnClose = () => {
    this.setState({ isPasswordChanged: false });
    this.props.history.push('/');
  };

  handleOnEmailChange = e => {
    const currValue = e.target.value;

    if (!validateEmail(currValue))
      return this.setState({
        email: currValue,
        isEmailError: true,
        emailError: 'Invalid Email Address'
      });

    this.setState({ email: currValue, isEmailError: false, emailError: null });
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
    const { isEmailSent, isOtpConfirmed } = this.state;

    // enable OTP confirmation
    if (false === isEmailSent) {
      const { email, isEmailError } = this.state;

      // if some errors already exists
      if (isEmailError) return;

      // check for empty field
      if (isEmptyString(email)) {
        return this.setState({
          isEmailError: true,
          emailError: 'Field must not be empty'
        });
      }

      return this.setState({ isEmailSent: true, buttonTitle: 'Confirm OTP' });
    }

    // enable password reset
    if (false === isOtpConfirmed) {
      const { otp, isOtpError } = this.state;

      // check if some errors already exists
      if (isOtpError) return;

      // check for empty field
      if (isEmptyString(otp)) {
        return this.setState({
          isOtpError: true,
          otpError: 'Field must not be empty'
        });
      }

      return this.setState({
        isOtpConfirmed: true,
        buttonTitle: 'Reset Password'
      });
    }

    const {
      password,
      confirmPassword,
      isPasswordError,
      isConfirmPasswordError
    } = this.state;

    // check for already existing errors
    if (isPasswordError || isConfirmPasswordError) return;

    // check for empty fields
    let isError = false;
    if (isEmptyString(password)) {
      isError = true;
      this.setState({
        isPasswordError: true,
        passwordError: 'Field must not be empty'
      });
    }
    if (isEmptyString(confirmPassword)) {
      isError = true;
      this.setState({
        isConfirmPasswordError: true,
        confirmPasswordError: 'Field must not be empty'
      });
    }

    if (isError) return;

    // redirect to login page, after successfully resetting the password
    this.setState({ isPasswordChanged: true });
    setTimeout(() => {
      this.props.history.push('/');
    }, 2000);
  };

  render() {
    const {
      isEmailSent,
      isOtpConfirmed,
      buttonTitle,
      isPasswordChanged,
      isEmailError,
      emailError,
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
          <Box component='div' style={{ padding: 50 }}>
            <form>
              <Paper style={{ padding: 20 }}>
                <TextField
                  id='outlined-email-input'
                  fullWidth
                  label='Enter registered email address'
                  type='email'
                  name='email'
                  value={this.state.email}
                  error={isEmailError}
                  helperText={emailError}
                  disabled={isEmailSent}
                  onChange={e => this.handleOnEmailChange(e)}
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

export default ForgotPassword;
