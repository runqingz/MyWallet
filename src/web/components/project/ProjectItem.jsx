import React, { useState } from 'react';
import { Card, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import DeleteProjectModal from './DeleteProjectModal';
import UpdateProjectForm from './UpdateProjectForm';

import { updateProject, deleteProject } from '../../actions/projectActions';
import apiErrorAction from '../../actions/apiErrorAction';
import handleApiError from '../../utils/apiUtils';

export default function ProjectItem({ project }) {
  const dispatch = useDispatch();
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const { Meta } = Card;
  const { id, projectIdentifier } = project;
  const history = useHistory();

  async function onUpdate(values) {
    const data = values;
    data.id = id;

    setUpdateFormVisible(false);
    try {
      const action = await updateProject(values);
      message.loading({ content: 'Loading Projects', key: 'updateProject', duration: 0 });
      dispatch(action);

      message.success({ content: 'Success', key: 'updateProject', duration: 1 });
    } catch (err) {
      const errorAction = apiErrorAction(err);
      handleApiError(err, 'updateProject');
      dispatch(errorAction);
    }
  }

  async function onDelete() {
    try {
      const action = await deleteProject(projectIdentifier);
      message.loading({ content: 'Loading Projects', key: 'deleteProject', duration: 0 });
      dispatch(action);

      message.success({ content: 'Success', key: 'deleteProject', duration: 1 });
    } catch (err) {
      const errorAction = apiErrorAction(err);
      handleApiError(err, 'deleteProject');
      dispatch(errorAction);
    }
  }

  return (
    <div>
      <Card
        title={project.projectName}
        actions={[
          <EditOutlined key="edit" onClick={() => { setUpdateFormVisible(true); }} />,
          <DeleteOutlined key="delete" onClick={() => { DeleteProjectModal({ onOk: onDelete }); }} />,
        ]}
        extra={(
          <Button
            type="link"
            size="small"
            onClick={() => {
              history.push(`/project/${project.projectIdentifier}`);
            }}
          >
            Details
          </Button>
)}
      >
        <Meta
          description={project.description}
        />
      </Card>
      <UpdateProjectForm
        visible={updateFormVisible}
        onUpdate={onUpdate}
        onCancel={() => {
          setUpdateFormVisible(false);
        }}
        project={project}
      />
    </div>
  );
}

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};
