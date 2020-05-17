import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const DeleteProjectModal = ({
  id, onOk, onCancel,
}) => {
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      onOk(id);
    },
    onCancel() {
      onCancel();
    },
  });
};

export default DeleteProjectModal;
