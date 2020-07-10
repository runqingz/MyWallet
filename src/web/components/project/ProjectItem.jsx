/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Card, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject, updateProject } from '../../actions/projectActions';
import { handleAuthenticationError } from '../../actions/securityActions';

import DeleteProjectModal from './DeleteProjectModal';
import UpdateProjectForm from './UpdateProjectForm';
import UnauthenticatedModal from '../security/SecurityModal';

const { Meta } = Card;

class ProjectItem extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
    };

    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  async onUpdate(values) {
    const { project } = this.props;
    const data = values;
    data.id = project.id;

    this.setState({ visible: false });
    message.loading({ content: 'In Progress...', key: 'updateProject', duration: 0 });

    const err = await this.props.updateProject(values);
    if (err) {
      if (err.status === 401) {
        message.error({ content: 'In Progress...', key: 'updateProject', duration: 0.5 });
        const onOk = () => {
          this.props.handleAuthenticationError();
        };
        UnauthenticatedModal('Invalid Credentials', onOk);
      } else {
        message.error({ content: JSON.stringify(err.data), key: 'updateProject', duration: 1 });
      }
    } else {
      message.success({ content: 'Success', key: 'updateProject' });
    }
  }

  async onDelete(id) {
    message.loading({ content: 'In Progress...', key: 'deleteProject', duration: 0 });

    const err = await this.props.deleteProject(id);
    if (err) {
      if (err.status === 401) {
        message.error({ content: 'In Progress...', key: 'deleteProject', duration: 0.5 });
        const onOk = () => {
          this.props.handleAuthenticationError();
        };
        UnauthenticatedModal('Invalid Credentials', onOk);
      } else {
        message.error({ content: JSON.stringify(err.data), key: 'deleteProject', duration: 1 });
      }
    } else {
      message.success({ content: 'Success', key: 'deleteProject' });
    }
  }

  onDetailClicked(url) {
    this.props.history.push(url);
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <Card
          style={{ width: 300 }}
          title={project.projectName}
          actions={[
            <EditOutlined key="edit" onClick={() => { this.setState({ visible: true }); }} />,
            <DeleteOutlined key="delete" onClick={() => { DeleteProjectModal({ id: project.projectIdentifier, onOk: this.onDelete }); }} />,
          ]}
          extra={<a href={`/project/${project.projectIdentifier}`}>Details</a>}
        >
          <Meta
            description={project.description}
          />
        </Card>
        <UpdateProjectForm
          visible={this.state.visible}
          onUpdate={this.onUpdate}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          project={project}
        />
      </div>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  handleAuthenticationError: PropTypes.func.isRequired,
};

export default connect(null,
  { deleteProject, updateProject, handleAuthenticationError })(ProjectItem);
