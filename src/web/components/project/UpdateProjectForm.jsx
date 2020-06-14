/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Form, Input,
} from 'antd';
import moment from 'moment';

const UpdateProjectForm = ({
  visible, onUpdate, onCancel, project,
}) => {
  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';
  return (
    <Modal
      visible={visible}
      title={`Update Project: ${project.projectName}`}
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onUpdate(values);
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
          projectName: project.projectName,
          projectIdentifier: project.projectIdentifier,
          description: project.description,
          startDate: moment(project.startDate, dateFormat),
          endDate: moment(project.endDate, dateFormat),
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
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input the unique identifier of project!',
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

UpdateProjectForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

export default UpdateProjectForm;
