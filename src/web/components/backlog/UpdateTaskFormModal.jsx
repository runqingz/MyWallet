import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Form, Input, DatePicker, Select, InputNumber,
} from 'antd';
import moment from 'moment';

const UpdateTaskFormModal = ({
  task, onUpdate, onCancel, isUpdating,
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const dateFormat = 'YYYY-MM-DD';
  const [form] = Form.useForm();
  return (
    <Modal
      visible
      title="Edit Task"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={isUpdating}
      cancelButtonProps={{ disabled: isUpdating }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onUpdate(values, task.id);
          })
          .catch((info) => {
            // console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        layout="vertical"
        name="form_in_modal"
        form={form}
        initialValues={{
          modifier: 'public',
          summary: task.summary,
          status: task.status,
          type: task.type,
          value: task.value,
          postDate: moment(task.postDate, dateFormat),
          description: task.description,
        }}
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
          <TextArea rows={2} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

UpdateTaskFormModal.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  isUpdating: PropTypes.bool.isRequired,
};

export default UpdateTaskFormModal;
