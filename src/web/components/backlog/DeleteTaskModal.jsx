import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const DeleteTaskModal = ({
  projectId, taskId, onOk,
}) => {
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleOutlined />,
    content: 'This operation is irrevertible',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      onOk(projectId, taskId);
    },
    onCancel() {
    },
  });
};

export default DeleteTaskModal;
