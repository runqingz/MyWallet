/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Card, message } from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject, updateProject } from '../../actions/projectActions';
import DeleteProjectModal from './DeleteProjectModal';

import UpdateProjectForm from './UpdateProjectForm';

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
    if (!err) {
      message.success({ content: 'Success', key: 'updateProject' });
    } else {
      message.error({ content: JSON.stringify(err), key: 'updateProject' });
    }
  }

  async onDelete(id) {
    message.loading({ content: 'In Progress...', key: 'deleteProject', duration: 0 });

    const err = await this.props.deleteProject(id);
    if (!err) {
      message.success({ content: 'Success', key: 'deleteProject' });
    } else {
      message.error({ content: JSON.stringify(err), key: 'deleteProject' });
    }
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <Card
          style={{ width: 300 }}
          actions={[
            <EditOutlined key="edit" onClick={() => { this.setState({ visible: true }); }} />,
            <DeleteOutlined key="delete" onClick={() => { DeleteProjectModal({ id: project.projectIdentifier, onOk: this.onDelete }); }} />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            title={project.projectName}
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
};

export default connect(null, { deleteProject, updateProject })(ProjectItem);
