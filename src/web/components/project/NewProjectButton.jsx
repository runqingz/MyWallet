import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const NewProjectButton = () => (
  <>
    <Link to="/addProject" href="ProjectForm.html">
      <Button type="primary">primary</Button>
    </Link>
  </>
);

export default NewProjectButton;
