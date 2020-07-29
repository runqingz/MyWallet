import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { message, List } from 'antd';

import ProjectItem from './project/ProjectItem';
import NewProjectButton from './project/NewProjectButton';
import handleApiError from '../utils/apiUtils';

import { GET_PROJECTS } from '../actions/types';

async function fetchData(dispatch) {
  try {
    message.loading({ content: 'Loading Projects', key: 'getAllProjects', duration: 0 });
    const res = await axios.get('/api/project/all');
    dispatch({ type: GET_PROJECTS, payload: res.data });

    message.success({ content: 'Success', key: 'getAllProjects', duration: 1 });
  } catch (err) {
    handleApiError(dispatch, err, 'getAllProjects');
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
