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
    };

    this.onCreate = this.onCreate.bind(this);
  }

  onCreate = values => {
    console.log('Received values of form: ', values);
    this.props.createProject(values);
    this.setState({visible: false});

    if(!this.state.errors) {
      message.success('Success!');
    }
    else {
      //Display Error
    }
  };

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
