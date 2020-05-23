import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const DeleteProjectModal = ({
  id, onOk,
}) => {
  confirm({
    title: 'Are you sure delete this project?',
    icon: <ExclamationCircleOutlined />,
    content: 'All related tasks will be deleted',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      onOk(id);
    },
    onCancel() {
    },
  });
};

export default DeleteProjectModal;
