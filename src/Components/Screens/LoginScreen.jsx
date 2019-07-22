import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import redux actions
import { loginAction } from '../../store/actions/authActions';

// import utils
import { isEmptyString, checkRegno } from '../../Utils/string';

// import components
import LoginHeader from '../Layouts/Headers/LoginHeader';

class LoginScreen extends Component {
  state = {
    // regno
    regno: null,
    isregnoError: false,
    regnoError: null,
    // password
    password: null,
    isPasswordError: false,
    passwordError: null
  };

  handleOnregnoChange = e => {
    const currregno = e.target.value;

    if (!checkRegno(currregno))
      return this.setState({
        regno: currregno,
        isregnoError: true,
        regnoError: 'Invalid Registration Number'
      });

    this.setState({ regno: currregno, isregnoError: false, regnoError: null });
  };

  handleOnPasswordChange = e => {
    const currPassword = e.target.value;

    this.setState({
      password: currPassword,
      isPasswordError: false,
      passwordError: null
    });
  };

  handleOnSubmit = () => {
    let { regno, isregnoError, password, isPasswordError } = this.state;

    // check for empty fields
    let isError = false;
    if (isEmptyString(regno)) {
      isError = true;
      this.setState({
        isregnoError: true,
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

    if (isError) return;

    // check for any existing errors
    if (isregnoError || isPasswordError) return;

    // send user credentials to the server
    this.props
      .loginAction(regno, password)
      .then(() => {
        // user logged in
        this.props.history.push('/home');
      })
      .catch(() => {
        const { message } = this.props;
        // authentication failed
        if ('User not registered' === message) {
          this.setState({ isregnoError: true, regnoError: message });
          setTimeout(() => {
            this.setState({ isregnoError: false, regnoError: null });
          }, 3000);
        } else if ('Incorrect Password' === message) {
          this.setState({
            isPasswordError: true,
            passwordError: message
          });
          setTimeout(() => {
            this.setState({ isPasswordError: false, passwordError: null });
          }, 3000);
        } else {
          alert(message);
        }
      });
  };

  render() {
    const {
      isregnoError,
      isPasswordError,
      regnoError,
      passwordError
    } = this.state;

    return (
      <Box
        component='div'
        style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}
      >
        <LoginHeader
          history={this.props.history}
          route='/sign-up'
          title='New Here? Sign Up'
        />
        <Container>
          <Box component='div'>
            <Grid container direction='row' style={{ marginTop: 10 }}>
              <Grid item xs={1} />
              <Grid item xs={6} style={{ padding: 20 }}>
                <Typography variant='h4'>
                  First time here? Let us explain what exactly we do.
                </Typography>
                <br />
                <Typography>
                  Connect++ is developed in an effort to connect the coders of
                  MUJ, so that they can finally have a platform where every
                  coder can put up their profile which might benefit the others
                  who are begining their journey to the same path.
                </Typography>
                <br />
                <Typography>
                  When you were getting started with a new field, say Machine
                  Learning, did you see around yourself and wondered how are
                  others doing it? I wonder where did he learn this technology
                  from? Or, this course on Udemy is highly rated but is it good
                  for me, did others around me also did this course?
                </Typography>
                <br />
                <Typography>
                  If yes, then this is the perfect platform for you. And if no,
                  then there are others who answered this question as yes.
                  Technology is a waste without community. Help others by
                  telling what things who've learnt and where did you learn them
                  from.
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid
                item
                xs={4}
                direction='row'
                justify='center'
                alignContent='center'
                style={{ padding: 10 }}
              >
                <form>
                  <Paper style={{ padding: 20 }}>
                    <TextField
                      id='outlined-regno-input'
                      fullWidth
                      label='Registration Number'
                      type='text'
                      name='regno'
                      value={this.state.regno}
                      error={isregnoError}
                      helperText={regnoError}
                      onChange={e => this.handleOnregnoChange(e)}
                      margin='normal'
                      variant='outlined'
                    />
                    <TextField
                      id='outlined-password-input'
                      fullWidth
                      label='Password'
                      type='password'
                      value={this.state.password}
                      error={isPasswordError}
                      helperText={passwordError}
                      onChange={e => this.handleOnPasswordChange(e)}
                      margin='normal'
                      variant='outlined'
                    />
                    <br />
                    <br />
                    <Button
                      onClick={() => this.handleOnSubmit()}
                      variant='contained'
                      color='primary'
                      fullWidth
                    >
                      Login
                    </Button>
                    <br />
                    <br />
                    <Button
                      onClick={() =>
                        this.props.history.push('/forgot-password')
                      }
                      color='secondary'
                    >
                      Forgot Password?
                    </Button>
                  </Paper>
                </form>
              </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <Box
              component='div'
              // style={{ paddingLeft: 200, paddingRight: 200 }}
            >
              <Typography variant='h4' align='center'>
                Want to contribute to Connect++?
              </Typography>
              <br />
              <Typography>
                Connect++ is an open source project, possibly the first of its
                kind in MUJ. So if you feel like contributing to it, kindly do
                step forward because this platform will not grow without the
                efforts of everyone in the same direction.
              </Typography>
              <br />
              <br />
              <Typography>
                If you are a <span style={{ color: 'red' }}>React.js</span>{' '}
                developer, then you can head to Connect++'s{' '}
                <a href='https://github.com/saran-shabd/connect-plus-plus/'>
                  Github
                </a>{' '}
                Page. Look around, see the code for yourself. If you feel like
                contributing, kindly do so. Or if not, then you can always learn
                more by reading other people's code.
              </Typography>
              <br />
              <br />
              <Typography>
                And don't worry, the underlying REST API for Connect++ is also
                open sourced. So if you are a{' '}
                <span style={{ color: 'red' }}>Node.js</span> developer, then
                you can visited{' '}
                <a href='https://github.com/saran-shabd/Wiz-API/'>Wiz-API</a>{' '}
                and the rest is up to you.
              </Typography>
              <br />
              <br />
              <Typography variant='h6' align='right'>
                - Shabd Saran
              </Typography>
              <Typography align='right'>(Founder)</Typography>
              <br />
              <br />
              <br />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

LoginScreen.propTypes = {
  loginAction: PropTypes.func.isRequired,
  loginStatus: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  loginStatus: state.auth.loginStatus,
  message: state.auth.message
});

export default withRouter(
  connect(
    mapStateToProps,
    { loginAction }
  )(LoginScreen)
);
