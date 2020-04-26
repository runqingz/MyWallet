/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProjectItem from './project/ProjectItem';
import NewProjectButton from './project/NewProjectButton';
import { getProjects } from '../actions/projectActions';

class Dashboard extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getProjects();
  }

  render() {
    const { project } = this.props;
    const { projects } = project;

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <NewProjectButton />
              <br />
              <hr />
              {projects.map((projectIt) => (
                <ProjectItem key={projectIt.id} project={projectIt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
