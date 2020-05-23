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

  async onCreate(values) {
    this.setState({ visible: false });
    message.loading({ content: 'In Progress...', key: 'addProject' });
    const err = await this.props.createProject(values);
    if (!err) {
      message.success({ content: 'Success', key: 'addProject' });
    } else {
      message.error(JSON.stringify(err));
    }
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            this.setState({ visible: true });
          }}
        >
          New Project
        </Button>
        <NewProjectForm
          visible={visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({ visible: false });
          }}
        />
      </div>
    );
  }
}

NewProjectButton.propTypes = {
  createProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(NewProjectButton);
