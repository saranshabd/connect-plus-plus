import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// import components
import HomeHeader from '../Layouts/Headers/HomeHeader';
import UserProfile from '../Layouts/HomePage/UserProfile';
import UserDetails from '../Layouts/HomePage/UserDetails';

class HomeScreen extends Component {
  render() {
    return (
      <Box
        component='div'
        style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}
      >
        <HomeHeader history={this.props.history} />
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
      </Box>
    );
  }
}
export default HomeScreen;
