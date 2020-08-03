import React from 'react';
import {
  Form, Input, DatePicker, Button, Card, Select, message, InputNumber,
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import handleApiError from '../../utils/apiUtils';
import apiErrorAction from '../../actions/apiErrorAction';
import { createBacklogTasks } from '../../actions/backlogActions';

export default function AddTaskForm() {
  const history = useHistory();
  const { projectId } = useParams();
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();

  async function onFinish(values) {
    try {
      message.loading({ content: 'In Progress...', key: 'createTask', duration: 0 });
      const createTaskAction = await createBacklogTasks(values, projectId);
      dispatch(createTaskAction);
      message.success({ content: 'Success', key: 'createTask', duration: 1 });
      history.push(`/project/${projectId}`);
    } catch (err) {
      const errorAction = apiErrorAction(err);
      handleApiError(err, 'createTask');
      dispatch(errorAction);
    }
  }

  function onCancel() {
    history.push(`/project/${projectId}`);
  }

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
                onFinish={onFinish}
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
                    <Option value="PENDING">Pending</Option>
                    <Option value="POSTED">Posted</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                  <Select
                    placeholder="Select task type"
                    allowClear
                    style={{ width: '150px' }}
                  >
                    <Option value="INCOME">Income</Option>
                    <Option value="GROCERY">Grocery</Option>
                    <Option value="ENTERTAINMENT">Entertainment</Option>
                    <Option value="HEALTH">Health</Option>
                    <Option value="UTILITY">Utility</Option>
                    <Option value="OTHER">Other</Option>
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
                  <Button type="default" htmlType="button" onClick={onCancel}>
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
