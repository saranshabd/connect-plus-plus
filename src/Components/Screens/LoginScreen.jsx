import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// import utils
import { isEmptyString, validateEmail } from '../../Utils/string';

// import components
import LoginHeader from '../Layouts/Headers/LoginHeader';

class LoginScreen extends Component {
  state = {
    // email
    email: null,
    isEmailError: false,
    emailError: null,
    // password
    password: null,
    isPasswordError: false,
    passwordError: null
  };

  handleOnEmailChange = e => {
    const currEmail = e.target.value;

    if (!validateEmail(currEmail))
      return this.setState({
        email: currEmail,
        isEmailError: true,
        emailError: 'Invalid Email Address'
      });

    this.setState({ email: currEmail, isEmailError: false, emailError: null });
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
    let { email, isEmailError, password, isPasswordError } = this.state;

    // check for empty fields
    let isError = false;
    if (isEmptyString(email)) {
      isError = true;
      this.setState({
        isEmailError: true,
        emailError: 'Field must not be empty'
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
    if (isEmailError || isPasswordError) return;

    this.props.history.push('/home');
  };

  render() {
    const {
      isEmailError,
      isPasswordError,
      emailError,
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
                      id='outlined-email-input'
                      fullWidth
                      label='Email'
                      type='email'
                      name='email'
                      value={this.state.email}
                      error={isEmailError}
                      helperText={emailError}
                      onChange={e => this.handleOnEmailChange(e)}
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

export default LoginScreen;
