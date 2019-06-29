import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

// import component
import ProjectsExpansionPanel from './ProjectsExpansionPanel';
import TechUsedExpansionPanel from './TechUsedExpansionPanel';
import CompetitiveProgrammingExpansionPanel from './CompetitiveProgrammingExpansionPanel';

class UserDetails extends Component {
  render() {
    return (
      <Paper
        elevation={10}
        style={{ marginTop: 20, width: '100%', padding: 10 }}
      >
        <ProjectsExpansionPanel />
        <CompetitiveProgrammingExpansionPanel />
        <TechUsedExpansionPanel />
      </Paper>
    );
  }
}

export default UserDetails;
