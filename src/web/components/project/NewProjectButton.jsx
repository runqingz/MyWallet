import React, { useState } from 'react';
import { message, Button } from 'antd';
import { useDispatch } from 'react-redux';

import NewProjectForm from './AddProject';
import { createProject } from '../../actions/projectActions';
import apiErrorAction from '../../actions/apiErrorAction';
import handleApiError from '../../utils/apiUtils';

export default function NewProjectButton() {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState(false);

  async function onCreate(values) {
    setFormVisible(false);

    try {
      const action = await createProject(values);
      message.loading({ content: 'Adding New Project', key: 'addProject', duration: 0 });
      dispatch(action);

      message.success({ content: 'Success', key: 'addProject', duration: 1 });
    } catch (err) {
      const errorAction = apiErrorAction(err);
      handleApiError(err, 'updateProject');
      dispatch(errorAction);
    }
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setFormVisible(true);
        }}
      >
        New Project
      </Button>
      <NewProjectForm
        visible={formVisible}
        onCreate={onCreate}
        onCancel={() => {
          setFormVisible(false);
        }}
      />
    </div>
  );
}
