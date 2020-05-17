/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Card, message } from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projectActions';
import DeleteProjectModal from './DeleteProjectModal';

const { Meta } = Card;

class ProjectItem extends Component {
  constructor() {
    super();

    this.onOk = this.onOk.bind(this);
  }


  onOk(id) {
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
            <Link to={`/updateProject/${project.projectIdentifier}`}>
              <EditOutlined key="edit" />
            </Link>,
            <DeleteOutlined key="delete" onClick={() => { DeleteProjectModal({ id: project.projectIdentifier, onOk: this.onOk }); }} />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            title={project.projectName}
            description={project.description}
          />
        </Card>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
