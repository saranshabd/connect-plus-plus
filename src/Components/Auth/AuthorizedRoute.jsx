import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import redux actions
import { verifyUseraccessToken } from '../../store/actions/authActions';

import { isEmptyString } from '../../Utils/string';

class AuthorizedRoute extends Component {
  state = {
    isValidated: false,
    wait: false
  };

  componentWillMount() {
    this.setState({ wait: true });
    const useraccesstoken = localStorage.getItem('useraccesstoken');
    if (!isEmptyString(useraccesstoken))
      this.props
        .verifyUseraccessToken(useraccesstoken)
        .then(() => {
          this.setState({ isValidated: true, wait: false });
        })
        .catch(() => {
          this.setState({ isValidated: false, wait: false });
          console.log(useraccesstoken);
        });
    else this.setState({ isValidated: false, wait: false });
  }

  render() {
    const {
      component: RenderComponent,
      verifyUseraccessToken,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          while (!this.state.wait) {
            if (this.state.isValidated) {
              return <RenderComponent {...props} {...rest} />;
            } else {
              localStorage.removeItem('useraccesstoken');
              return <Redirect to={{ pathname: '/' }} />;
            }
          }
        }}
      />
    );
  }
}

AuthorizedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  verifyUseraccessToken: PropTypes.func.isRequired
};

export default connect(
  null,
  { verifyUseraccessToken }
)(AuthorizedRoute);
