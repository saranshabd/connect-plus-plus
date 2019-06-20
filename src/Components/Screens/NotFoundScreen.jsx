import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// import components
import SimpleHeader from '../Layouts/Headers/SimpleHeader';

// import app-color
import { APP_COLOR } from '../../constants/app';

class NotFoundScreen extends Component {
  render() {
    return (
      <Box>
        <SimpleHeader />
        <Container style={{ paddingTop: 20 }}>
          <Box component='div' textAlign='center'>
            <Typography variant='h2'>
              <span style={{ color: APP_COLOR }}>404</span> Not Found
            </Typography>
            <br />
            <Typography variant='h5'>
              The page you are looking for does not exists
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default NotFoundScreen;
