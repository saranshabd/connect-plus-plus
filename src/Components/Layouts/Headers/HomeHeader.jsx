import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import { CssBaseline } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// import components
import SearchBar from '../HomePage/SearchBar';

import { removeUserAccessToken } from '../../../LocalStorageActions/auth';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function HomeHeader(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnLogo = () => {
    props.history.push('/home');
  };

  const handleOnSignout = () => {
    setAnchorEl(null);
    removeUserAccessToken();
    props.history.push('/');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar style={{ flexDirection: 'row' }}>
            <Box className={classes.title}>
              <IconButton onClick={handleOnLogo} color='inherit'>
                <Typography variant='h4'>Connect++</Typography>
              </IconButton>
            </Box>
            <SearchBar />
            {/* <IconButton
              aria-label='Account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOnSearch}
              color='inherit'
            >
              <SearchButton />
            </IconButton> */}
            <IconButton
              aria-label='Account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <MoreVert />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleOnSignout}>Sign out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}

export default HomeHeader;
