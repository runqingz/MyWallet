import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import NewProjectForm from './AddProject';

import { createProject } from '../../actions/projectActions';

class NewProjectButton extends React.Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      error: {},
    };

    this.onCreate = this.onCreate.bind(this);
  }
  
  delay = ms => new Promise(res => setTimeout(res, ms));

  onCreate = async values => {
    this.setState({visible: false});
    message.loading({ content: 'Loading...', key: 'addProject' });
    const err = await this.props.createProject(values);
    if (!err)
    {
      message.success({ content: 'Success', key: 'addProject' });
    } else {
      //console.log(err);
      message.error(JSON.stringify(err));
    }
  }

  render(){
    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            this.setState({visible: true})
          }}
        >
          New Project
        </Button>
        <NewProjectForm
          visible={this.state.visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({visible: false})
          }}
        />
      </div>
    );
 }
};

NewProjectButton.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(NewProjectButton);
