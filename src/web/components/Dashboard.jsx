import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { message, List } from 'antd';

import ProjectItem from './project/ProjectItem';
import NewProjectButton from './project/NewProjectButton';

import { getProjects } from '../actions/projectActions';
import apiErrorAction from '../actions/apiErrorAction';
import handleApiError from '../utils/apiUtils';

async function fetchData(dispatch) {
  try {
    const action = await getProjects();
    message.loading({ content: 'Loading Projects', key: 'getAllProjects', duration: 0 });
    dispatch(action);

    message.success({ content: 'Success', key: 'getAllProjects', duration: 1 });
  } catch (err) {
    const errorAction = apiErrorAction(err);
    handleApiError(err, 'getAllProjects');
    dispatch(errorAction);
  }
}

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  const projects = useSelector((state) => state.project.projects);

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
                xl: 4,
                xxl: 4,
              }}
              dataSource={projects}
              renderItem={(projectIt) => (
                <List.Item>
                  <ProjectItem project={projectIt} />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
