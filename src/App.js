import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';

// import redux store
import reduxStore from './store';

// import route types
import AuthorizedRoute from './Components/Auth/AuthorizedRoute';
import UnAuthorizedRoute from './Components/Auth/UnAuthorizedRoute';

// import screens
import LoginScreen from './Components/Screens/LoginScreen';
import SignUpScreen from './Components/Screens/SignUpScreen';
import ForgotPasswordScreen from './Components/Screens/ForgotPasswordScreen';
import NotFoundScreen from './Components/Screens/NotFoundScreen';
import HomeScreen from './Components/Screens/HomeScreen';

// import app-color
import { APP_COLOR } from './constants/app';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: APP_COLOR
    }
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <BrowserRouter>
          <ThemeProvider theme={appTheme}>
            <Switch>
              <UnAuthorizedRoute exact path='/' component={LoginScreen} />
              <UnAuthorizedRoute
                exact
                path='/sign-up'
                component={SignUpScreen}
              />
              <UnAuthorizedRoute
                exact
                path='/forgot-password'
                component={ForgotPasswordScreen}
              />
              <AuthorizedRoute exact path='/home' component={HomeScreen} />
              <Route component={NotFoundScreen} />
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
