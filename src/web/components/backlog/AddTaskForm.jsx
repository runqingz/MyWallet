/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, Input, DatePicker, Button, Card, Select, message, InputNumber,
} from 'antd';

import { createBacklogTasks } from '../../actions/backlogActions';

class AddTaskForm extends Component {
  constructor() {
    super();
    this.onFinish = this.onFinish.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  async onFinish(values) {
    const { history, match: { params: { projectId } } } = this.props;
    try {
      message.loading({ content: 'In Progress...', key: 'createTask', duration: 0 });
      await this.props.createBacklogTasks(values, projectId);
      message.success({ content: 'Success', key: 'createTask', duration: 1 });
      history.push(`/project/${projectId}`);
    } catch (error) {
      message.error({ content: JSON.stringify(error.response.data), key: 'createTask' });
    }
  }

  onCancel() {
    const { history, match: { params: { projectId } } } = this.props;
    history.push(`/project/${projectId}`);
  }


  render() {
    const { Option } = Select;
    const { TextArea } = Input;
    return (
      <div className="addTaskForm">
        <div className="container-md">
          <div className="row justify-content-md-center">
            <div className="col-8">
              <br />
              <hr />
              <Card title="Add New Task">
                <Form
                  layout="vertical"
                  name="form_in_modal"
                  initialValues={{
                    modifier: 'public',
                  }}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    name="summary"
                    label="Task Summary"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the summary of the task',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                    <Select
                      placeholder="Select task status"
                      allowClear
                      style={{ width: '150px' }}
                    >
                      <Option value="Pending">Pending</Option>
                      <Option value="Posted">Posted</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="value"
                    label="Value"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the value of the task',
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    name="postDate"
                    label="Post Date"
                    rules={[
                      {
                        required: true,
                        message: 'The post date of the task',
                      },
                    ]}
                  >
                    <DatePicker style={{ width: '150px' }} />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Description"
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '16px' }}>
                      Submit
                    </Button>
                    <Button type="default" htmlType="button" onClick={this.onCancel}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddTaskForm.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createBacklogTasks: PropTypes.func.isRequired,
};

export default connect(null, { createBacklogTasks })(AddTaskForm);
