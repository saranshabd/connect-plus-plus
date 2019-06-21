import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';

// import redux store
import reduxStore from './store';

// import screens
import LoginScreen from './Components/Screens/LoginScreen';
import SignUpScreen from './Components/Screens/SignUpScreen';
import ForgotPasswordScreen from './Components/Screens/ForgotPasswordScreen';
import NotFoundScreen from './Components/Screens/NotFoundScreen';

// import app-color
import { APP_COLOR } from './constants/app';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: APP_COLOR
    }
  }
});

function App() {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <Switch>
            <Route exact path='/' component={LoginScreen} />
            <Route exact path='/sign-up' component={SignUpScreen} />
            <Route
              exact
              path='/forgot-password'
              component={ForgotPasswordScreen}
            />
            <Route component={NotFoundScreen} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
