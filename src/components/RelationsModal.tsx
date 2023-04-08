/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { Modal, ModalProps } from '@mantine/core';
import { Relations } from 'utilities/types/dbTypes';

type Props = ModalProps & { onRelationsUpdate: (data: Relations[]) => void };

export default function RelationsModal(props: Props) {
  const { onRelationsUpdate, ...modalProps } = props;
  return (
    <Modal {...modalProps}>
      <h1>Relations</h1>
    </Modal>
  );
}
