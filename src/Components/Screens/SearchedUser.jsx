import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import redux actions
import {
  getSearchAccessToken,
  getSearchAccessTokenValue,
  getPublicProfile,
  getProjects,
  getProgrammingProfile,
  getTechUsed
} from '../../store/actions/searchAction';

import { setSearchUserTrue } from '../../store/actions/applicationStateActions';

// import components
import HomeHeader from '../Layouts/Headers/HomeHeader';
import UserProfile from '../Layouts/HomePage/UserProfile';
import UserDetails from '../Layouts/HomePage/UserDetails';

import { containsEmptyStrings, checkRegno } from '../../Utils/string';

class SearchedUser extends Component {
  state = {
    regno: null,
    publicProfileWait: true,
    programmingProfileWait: true,
    techUsedWait: true,
    projectsWait: true
  };

  componentWillMount() {
    const { regno } = this.props.match.params;
    if (containsEmptyStrings([regno]) || null === regno || !checkRegno(regno)) {
      return this.props.history.push('/user-not-found');
    } else {
      this.setState({ regno });

      // get SearchAccessToken of the user
      this.props
        .getSearchAccessToken(this.props.useraccesstoken, regno)
        .then(() => {
          this.props.setSearchUserTrue();
          // Load All Profiles
          this.loadUserDetails();
        })
        .catch(() => this.props.history.push('/user-not-found'));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.regno !== nextProps.location.state.regno) {
      window.location.reload();
    }
  }

  loadUserDetails = () => {
    this.props
      .getPublicProfile(getSearchAccessTokenValue())
      .then(() => this.setState({ publicProfileWait: false }));
    this.props
      .getProjects(getSearchAccessTokenValue())
      .then(() => this.setState({ projectsWait: false }));
    this.props
      .getProgrammingProfile(getSearchAccessTokenValue())
      .then(() => this.setState({ programmingProfileWait: false }));
    this.props
      .getTechUsed(getSearchAccessTokenValue())
      .then(() => this.setState({ techUsedWait: false }));
  };

  render() {
    return (
      <Box
        component='div'
        style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}
      >
        <HomeHeader history={this.props.history} />
        {this.state.publicProfileWait ||
        this.state.projectsWait ||
        this.state.programmingProfileWait ||
        this.state.techUsedWait ? (
          <LinearProgress />
        ) : (
          <Container>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={3}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: '100%'
                }}
              >
                <UserProfile />
              </Grid>
              <Grid item xs={12} sm={9}>
                <UserDetails />
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    );
  }
}

SearchedUser.propTypes = {
  getSearchAccessToken: PropTypes.func.isRequired,
  useraccesstoken: PropTypes.object.isRequired,
  searchAccessToken: PropTypes.string.isRequired,
  setSearchUserTrue: PropTypes.func.isRequired,
  public: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken,
  searchAccessToken: state.search.searchAccessToken,
  public: state.search.public
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getSearchAccessToken,
      getPublicProfile,
      getProjects,
      getProgrammingProfile,
      getTechUsed,
      setSearchUserTrue
    }
  )(SearchedUser)
);
