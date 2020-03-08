import React from 'react';
import { Link } from 'react-router-dom';

const NewProjectButton = () => (
  <>
    <Link to="/addProject" href="ProjectForm.html" className="btn btn-lg btn-info">
      Create a Project
    </Link>
  </>
);

export default NewProjectButton;
