/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projectActions';

const { Meta } = Card;

class ProjectItem extends Component {
  onDeleteClick(id) {
    this.props.deleteProject(id);
  }

  render() {
    const { project } = this.props;
    return (
      <Card
        style={{ width: 300 }}
        actions={[
          <Link to={`/updateProject/${project.projectIdentifier}`}>
            <EditOutlined key="edit" />
          </Link>,
          <DeleteOutlined key="delete" onClick={this.onDeleteClick.bind(this, project.projectIdentifier)} />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          title={project.projectName}
          description={project.description}
        />
      </Card>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
