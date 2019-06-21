import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import redux actions
import {
  signUpAction,
  signUpVerifyAction
} from '../../store/actions/authActions';

// import components
import LoginHeader from '../Layouts/Headers/LoginHeader';

// import utils
import { isEmptyString, checkRegno, validateName } from '../../Utils/string';

class SignUpScreen extends Component {
  state = {
    // firstname
    firstname: null,
    isFirstnameError: false,
    firstnameError: null,
    // lastname
    lastname: null,
    isLastnameError: false,
    lastnameError: null,
    // registration number
    regno: null,
    isRegnoError: false,
    regnoError: null,
    // password
    password: null,
    isPasswordError: false,
    passwordError: null,
    // confirm-password
    confirmPassword: null,
    isConfirmPasswordError: false,
    confirmPasswordError: null,
    // otp
    isOtpSent: false,
    otp: null,
    isOtpError: false,
    otpError: null,
    isOtpVerified: false,
    // submit button
    buttonTitle: 'Verify Email'
  };

  handleOnChangeFirstname = e => {
    const currValue = e.target.value;

    if (!validateName(currValue))
      return this.setState({
        firstname: currValue.trim(),
        isFirstnameError: true,
        firstnameError: 'Invalid Name'
      });

    this.setState({
      firstname: currValue.trim(),
      isFirstnameError: false,
      firstnameError: null
    });
  };

  handleOnChangeLastname = e => {
    const currValue = e.target.value;

    if (!validateName(currValue))
      return this.setState({
        lastname: currValue.trim(),
        isLastnameError: true,
        lastnameError: 'Invalid Name'
      });

    this.setState({
      lastname: currValue.trim(),
      isLastnameError: false,
      lastnameError: null
    });
  };

  handleOnRegnoChange = e => {
    const currValue = e.target.value;

    if (!checkRegno(currValue)) {
      return this.setState({
        regno: currValue,
        isRegnoError: true,
        regnoError: 'Invalid Registration Number'
      });
    }

    this.setState({ regno: currValue, isRegnoError: false, regnoError: null });
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

  handleOnOtpChange = e => {
    this.setState({ otp: e.target.value });
  };

  handleOnSubmit = () => {
    const {
      isOtpSent,
      isFirstnameError,
      isLastnameError,
      isRegnoError,
      isPasswordError,
      isConfirmPasswordError,
      firstname,
      lastname,
      regno,
      password,
      confirmPassword
    } = this.state;

    if (false === isOtpSent) {
      let isError = false;
      // check if there are any empty fields
      if (isEmptyString(firstname)) {
        isError = true;
        this.setState({
          isFirstnameError: true,
          firstnameError: 'Field must not be empty'
        });
      }
      if (isEmptyString(lastname)) {
        isError = true;
        this.setState({
          isLastnameError: true,
          lastnameError: 'Field must not be empty'
        });
      }
      if (isEmptyString(regno)) {
        isError = true;
        this.setState({
          isRegnoError: true,
          regnoError: 'Field must not be empty'
        });
      }
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

      // check if there exists any errors
      if (
        isFirstnameError ||
        isLastnameError ||
        isRegnoError ||
        isPasswordError ||
        isConfirmPasswordError
      )
        return;

      // send the OTP to the user email id
      this.props
        .signUpAction(firstname, lastname, regno, password)
        .then(() => {
          this.setState({ isOtpSent: true, buttonTitle: 'Confirm OTP' });
        })
        .catch(() => {
          let { message } = this.props;
          if ('User already registered' === message) {
            this.setState({
              isFirstnameError: true,
              isLastnameError: true,
              isRegnoError: true,
              firstnameError: message,
              lastnameError: message,
              regnoError: message
            });
            setTimeout(() => {
              this.setState({
                isFirstnameError: false,
                isLastnameError: false,
                isRegnoError: false,
                firstnameError: null,
                lastnameError: null,
                regnoError: null
              });
            }, 3000);
          } else {
            alert(message);
          }
        });
    } else {
      const { otp } = this.state;

      // check for empty fields
      if (isEmptyString(otp)) {
        return this.setState({
          isOtpError: true,
          otpError: 'Field must not be empty'
        });
      }

      // send OTP to the server to verify
      this.props
        // user account created successfully
        .signUpVerifyAction(this.props.signUpAccessToken, otp)
        .then(() => {
          this.setState({
            isOtpVerified: true,
            isOtpError: false,
            otpError: null
          });
          setTimeout(() => {
            this.setState({
              isOtpVerified: false
            });
            this.props.history.push('/home');
          }, 2000);
        })
        .catch(() => {
          // authentication failed
          this.setState({
            isOtpError: true,
            otpError: this.props.message
          });
          setTimeout(() => {
            this.setState({
              isOtpError: false,
              otpError: null
            });
          }, 3000);
        });
    }
  };

  handleOnClose = () => {
    this.setState({ isOtpVerified: false });
    this.props.history.push('/home');
  };

  render() {
    const {
      isFirstnameError,
      firstnameError,
      isLastnameError,
      lastnameError,
      isRegnoError,
      regnoError,
      isPasswordError,
      passwordError,
      isConfirmPasswordError,
      confirmPasswordError,
      isOtpSent,
      isOtpVerified,
      buttonTitle,
      isOtpError,
      otpError
    } = this.state;

    return (
      <Box
        component='div'
        style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}
      >
        <LoginHeader
          history={this.props.history}
          route='/'
          title='Already a User? Login'
        />
        <Container>
          <Box component='div' style={{ padding: 50 }}>
            <form>
              <Paper style={{ padding: 20 }}>
                <TextField
                  id='outlined-text-input'
                  fullWidth
                  disabled={isOtpSent}
                  label='First Name'
                  type='text'
                  name='firstname'
                  value={this.state.firstname}
                  error={isFirstnameError}
                  helperText={firstnameError}
                  onChange={e => this.handleOnChangeFirstname(e)}
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  id='outlined-text-input'
                  fullWidth
                  disabled={isOtpSent}
                  label='Last Name'
                  type='text'
                  name='lastname'
                  value={this.state.lastname}
                  error={isLastnameError}
                  helperText={lastnameError}
                  onChange={e => this.handleOnChangeLastname(e)}
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  id='outlined-number-input'
                  fullWidth
                  disabled={isOtpSent}
                  label='Registration Number'
                  type='text'
                  name='regno'
                  value={this.state.regno}
                  error={isRegnoError}
                  helperText={regnoError}
                  onChange={e => this.handleOnRegnoChange(e)}
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  id='outlined-password-input'
                  fullWidth
                  disabled={isOtpSent}
                  name='password'
                  label='Password'
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
                  disabled={isOtpSent}
                  name='confirmPassword'
                  label='Confirm Password'
                  value={this.state.confirmPassword}
                  error={isConfirmPasswordError}
                  helperText={confirmPasswordError}
                  onChange={e => this.handleOnConfirmPasswordChange(e)}
                  type='password'
                  margin='normal'
                  variant='outlined'
                />
                {isOtpSent ? (
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
                    margin='normal'
                    variant='outlined'
                  />
                ) : null}
                <br />
                <br />
                <Button
                  onClick={() => this.handleOnSubmit()}
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  {buttonTitle}
                </Button>
              </Paper>
            </form>
            <Snackbar
              open={isOtpVerified}
              message='Accont Created Successfully'
              autoHideDuration={2000}
              onClose={() => this.handleOnClose}
              action={[
                <IconButton
                  key='close'
                  aria-label='Close'
                  color='inherit'
                  onClick={() => this.handleOnClose()}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </Box>
        </Container>
      </Box>
    );
  }
}

SignUpScreen.propTypes = {
  signUpAction: PropTypes.func.isRequired,
  signUpStatus: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  signUpAccessToken: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  signUpStatus: state.auth.signUpStatus,
  message: state.auth.message,
  signUpAccessToken: state.auth.signUpAccessToken
});

export default connect(
  mapStateToProps,
  { signUpAction, signUpVerifyAction }
)(SignUpScreen);