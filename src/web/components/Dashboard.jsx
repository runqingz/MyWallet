/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message, List } from 'antd';

import ProjectItem from './project/ProjectItem';
import NewProjectButton from './project/NewProjectButton';
import { getProjects } from '../actions/projectActions';

class Dashboard extends React.Component {
  async componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    message.loading({ content: 'In Progress...', key: 'getAllProjects', duration: 0 });
    const err = await this.props.getProjects();
    if (err) {
      message.error({ content: JSON.stringify(err), key: 'getAllProjects' });
    } else {
      message.loading({ content: 'In Progress...', key: 'getAllProjects', duration: 1 });
    }
  }

  render() {
    const { project } = this.props;
    const { projects } = project;

    return (
      <div className="projects">
        <div className="container-lg">
          <div className="row">
            <div className="col-12">
              <br />
              <NewProjectButton />
              <hr />
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
                }}
                dataSource={projects}
                renderItem={(projectIt) => (
                  <List.Item>
                    <ProjectItem key={projectIt.id} project={projectIt} />
                  </List.Item>
                )}
              />
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
