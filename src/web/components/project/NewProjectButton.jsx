import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message, Button } from 'antd';
import NewProjectForm from './AddProject';

import { createProject } from '../../actions/projectActions';
import { handleAuthenticationError } from '../../actions/securityActions';
import UnauthenticatedModal from '../security/SecurityModal';

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
    message.loading({ content: 'In Progress...', key: 'addProject', duration: 0 });
    const err = await this.props.createProject(values);

    if (err) {
      if (err.status === 401) {
        message.error({ content: 'In Progress...', key: 'addProject', duration: 0.5 });
        const onOk = () => {
          this.props.handleAuthenticationError();
        };
        UnauthenticatedModal('Invalid Credentials', onOk);
      } else {
        message.error({ content: JSON.stringify(err.data), key: 'addProject', duration: 1 });
      }
    } else {
      message.success({ content: 'Success', key: 'addProject' });
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
  handleAuthenticationError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject, handleAuthenticationError })(NewProjectButton);
