/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Drawer, Button, DrawerProps } from '@mantine/core';
import { TableData } from 'utilities/types/dbTypes';

export default function EditorModal(
  props: DrawerProps & { onTableUpdate: (Data: TableData[]) => void }
) {
  const { onClose } = props;
  return (
    <Drawer {...props} withCloseButton={false} lockScroll={false}>
      <Box>
        <Button onClick={onClose}>Save Changes</Button>
      </Box>
    </Drawer>
  );
}
