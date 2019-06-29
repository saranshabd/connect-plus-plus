import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';

// import layouts
import HomeHeader from '../Layouts/Headers/HomeHeader';

class HomeScreen extends Component {
  render() {
    return (
      <Box
        component='div'
        style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}
      >
        <HomeHeader history={this.props.history} />
        <Container>
          <Box my={2}>
            {[...new Array(12)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join('\n')}
          </Box>
        </Container>
      </Box>
    );
  }
}

export default connect(
  null,
  null
)(HomeScreen);
