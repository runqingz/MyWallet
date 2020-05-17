/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Modal, Form, Input, DatePicker,
} from 'antd';

const NewProjectForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add new project"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="projectName"
          label="Project Name"
          rules={[
            {
              required: true,
              message: 'Please input the title of project!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="projectIdentifier"
          label="Project ID"
          rules={[
            {
              required: true,
              message: 'Please input the unique identifier of project!',
            },
            {
              max: 5,
              message: 'Please use no more than 5 character',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="startDate" label="Start Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="endDate" label="End Date">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewProjectForm;
