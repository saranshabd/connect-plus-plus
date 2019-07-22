import React, { Component } from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import { fade, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountCicle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { APP_COLOR } from '../../../constants/app';
import { decryptStr } from '../../../Utils/string';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing(2)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    },
    '&::placeholder': {
      color: '#fff'
    }
  }
}));

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon style={{ color: '#fff' }} />
      </div>
      <InputBase
        placeholder='Search Users'
        classes={{
          input: classes.inputInput
        }}
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
      />
    </div>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.fullname, query);
  const parts = parse(suggestion.fullname, matches);

  return (
    <MenuItem selected={isHighlighted} component='div'>
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 500 : 400 }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(users, value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : users.filter(user => {
        const keep =
          count < 5 &&
          user.fullname.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.fullname;
}

function IntegrationAutosuggest(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    name: ''
  });

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(props.users, value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue
    });
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };

  function handleOnSubmit(e) {
    e.preventDefault();

    // TODO
  }

  return (
    <div className={classes.root}>
      <form onSubmit={e => handleOnSubmit(e)}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            id: 'react-autosuggest-simple',
            label: 'User',
            value: state.name,
            onChange: handleChange('name')
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestion={suggestion => {
            return (
              <a
                href=''
                style={{ textDecoration: 'None' }}
                onClick={e => e.preventDefault()}
              >
                <Card
                  square
                  style={{ padding: 20, flex: 1 }}
                  onClick={() =>
                    props.history.push({
                      pathname: `/search/user/${suggestion.regno}`,
                      state: { regno: suggestion.regno }
                    })
                  }
                >
                  <Grid container direction='row'>
                    <Grid item xs={4} sm={4}>
                      {suggestion.profilePhoto ? (
                        <Avatar
                          alt='Remy Sharp'
                          src={suggestion.profilePhoto}
                          style={{
                            width: 70,
                            height: 70
                          }}
                        />
                      ) : (
                        <AccountCicle
                          style={{
                            color: APP_COLOR,
                            width: 70,
                            height: 70
                          }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <span style={{ fontSize: 20 }}>
                        {suggestion.fullname}
                      </span>
                      <br />
                      <span>{suggestion.regno}</span>
                    </Grid>
                  </Grid>
                </Card>
              </a>
            );
          }}
        />
      </form>
    </div>
  );
}

class Search extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    for (let i in this.props.users) {
      this.state.users.push({
        fullname: `${this.props.users[i].firstname} ${
          this.props.users[i].lastname
        }`,
        regno: this.props.users[i].regno,
        profilePhoto: this.props.users[i].profilePhoto
      });
    }
  }

  render() {
    return (
      <IntegrationAutosuggest
        users={this.state.users}
        history={this.props.history}
      />
    );
  }
}

Search.propTypes = {
  useraccesstoken: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  useraccesstoken: state.auth.useraccesstoken,
  users: JSON.parse(decryptStr(state.search.users)).users
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Search)
);
