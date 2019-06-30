import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import redux actions
import {
  getPublicProfile,
  getProjects,
  getCompetitiveProgrammingProfile,
  getTechUsed
} from '../../store/actions/profileActions';

// import components
import HomeHeader from '../Layouts/Headers/HomeHeader';
import UserProfile from '../Layouts/HomePage/UserProfile';
import UserDetails from '../Layouts/HomePage/UserDetails';

class HomeScreen extends Component {
  state = {
    isPublicProfileLoaded: true,
    isProjectsLoaded: true,
    isCompetitiveProgrammingLoaded: true,
    isTechUsedLoaded: true
  };

  componentWillMount() {
    // request for user public profile
    this.props
      .getPublicProfile(this.props.useraccesstoken)
      .then(() => this.setState({ isPublicProfileLoaded: false }));
    this.props
      .getProjects(this.props.useraccesstoken)
      .then(() => this.setState({ isProjectsLoaded: false }));
    this.props
      .getCompetitiveProgrammingProfile(this.props.useraccesstoken)
      .then(() => this.setState({ isCompetitiveProgrammingLoaded: false }));
    this.props
      .getTechUsed(this.props.useraccesstoken)
      .then(() => this.setState({ isTechUsedLoaded: false }));
  }

  isLoading = () => {
    return (
      this.state.isCompetitiveProgrammingLoaded ||
      this.state.isProjectsLoaded ||
      this.state.isPublicProfileLoaded ||
      this.state.isTechUsedLoaded
    );
  };

  render() {
    return (
      <Box
        component='div'
        style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}
      >
        <HomeHeader history={this.props.history} />

        {this.isLoading() ? (
          <LinearProgress style={{ color: 'white' }} />
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

HomeScreen.propTypes = {
  useraccesstoken: PropTypes.object.isRequired,
  getPublicProfile: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  getCompetitiveProgrammingProfile: PropTypes.func.isRequired,
  getTechUsed: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken
});

export default connect(
  mapStateToProps,
  {
    getPublicProfile,
    getProjects,
    getCompetitiveProgrammingProfile,
    getTechUsed
  }
)(HomeScreen);
