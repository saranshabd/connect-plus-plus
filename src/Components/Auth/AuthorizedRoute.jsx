import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import redux actions
import { verifyUseraccessToken } from '../../store/actions/authActions';

// import redux actions
import {
  getPublicProfile,
  getProjects,
  getCompetitiveProgrammingProfile,
  getTechUsed
} from '../../store/actions/profileActions';
import { cacheAllUsers } from '../../store/actions/searchAction';

// import string utilities
import { encryptStr, isEmptyString } from '../../Utils/string';

// import localStorage actions
import {
  getUserAccessToken,
  removeUserAccessToken
} from '../../LocalStorageActions/auth';

class AuthorizedRoute extends Component {
  state = {
    isValidated: false,
    wait: false,
    isPublicProfileLoaded: true,
    isProjectsLoaded: true,
    isCompetitiveProgrammingLoaded: true,
    isTechUsedLoaded: true,
    areUsersCached: true
  };

  componentWillMount() {
    this.setState({ wait: true });
    const useraccesstoken = getUserAccessToken();
    if (!isEmptyString(useraccesstoken)) {
      this.props
        .verifyUseraccessToken(useraccesstoken)
        .then(() => {
          this.setState({ isValidated: true, wait: false });
          this.loadUserDetails(useraccesstoken);
        })
        .catch(() => this.setState({ isValidated: false, wait: false }));
    } else {
      this.setState({ isValidated: false, wait: false });
    }
  }

  loadUserDetails = useraccesstoken => {
    this.props
      .getPublicProfile(encryptStr(useraccesstoken))
      .then(() => this.setState({ isPublicProfileLoaded: false }));
    this.props
      .getProjects(encryptStr(useraccesstoken))
      .then(() => this.setState({ isProjectsLoaded: false }));
    this.props
      .getCompetitiveProgrammingProfile(encryptStr(useraccesstoken))
      .then(() => this.setState({ isCompetitiveProgrammingLoaded: false }));
    this.props
      .getTechUsed(encryptStr(useraccesstoken))
      .then(() => this.setState({ isTechUsedLoaded: false }));
    this.props
      .cacheAllUsers(encryptStr(useraccesstoken))
      .then(() => this.setState({ areUsersCached: false }));
  };

  isLoading = () => {
    return (
      this.state.isCompetitiveProgrammingLoaded ||
      this.state.isProjectsLoaded ||
      this.state.isPublicProfileLoaded ||
      this.state.isTechUsedLoaded ||
      this.state.areUsersCached
    );
  };

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
              return this.isLoading() ? (
                <LinearProgress style={{ color: 'white' }} />
              ) : (
                <RenderComponent {...props} {...rest} />
              );
            } else {
              removeUserAccessToken();
              return <Redirect to={{ pathname: '/' }} />;
            }
          }
        }}
      />
    );
  }
}

AuthorizedRoute.propTypes = {
  useraccesstoken: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  verifyUseraccessToken: PropTypes.func.isRequired,
  getPublicProfile: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  getCompetitiveProgrammingProfile: PropTypes.func.isRequired,
  getTechUsed: PropTypes.func.isRequired,
  cacheAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken
});

export default connect(
  mapStateToProps,
  {
    verifyUseraccessToken,
    getPublicProfile,
    getProjects,
    getCompetitiveProgrammingProfile,
    getTechUsed,
    cacheAllUsers
  }
)(AuthorizedRoute);
