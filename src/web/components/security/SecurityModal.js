import { Modal } from 'antd';

const { error } = Modal;

export default function UnauthenticatedModal(message, onOk) {
  error({
    title: 'Unauthenticated Request',
    content: message,
    onOk() {
      onOk();
    },
  });
}
