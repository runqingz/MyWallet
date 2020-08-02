import { Modal } from 'antd';

const { error } = Modal;

export default function UnauthenticatedModal(message) {
  error({
    title: 'Unauthenticated Request',
    content: message,
  });
}
