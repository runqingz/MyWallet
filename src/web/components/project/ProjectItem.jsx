/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Card, message } from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projectActions';
import DeleteProjectModal from './DeleteProjectModal';
import { updateProject } from '../../actions/projectActions';
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

  onUpdate = values => {
    const { project } = this.props;
    values.id = project.id;
    console.log('Received values of form: ', values);
    this.props.updateProject(values);
    this.setState({visible: false});

    if(!this.state.errors) {
      message.success('Success!');
    }
    else {
      //Display Error
    }
  };

  onDelete(id) {
    this.props.deleteProject(id);
    message.success('Success!');
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
};

export default connect(null, { deleteProject, updateProject })(ProjectItem);
