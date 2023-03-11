import { Button, Drawer, DrawerProps, Flex } from '@mantine/core';

function DrawerControl(props: DrawerProps) {
  const { onClose } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Drawer {...props}>
      <Drawer.Body m={0} h="100%">
        <Flex bg="#38235c" p="sm" justify="space-between">
          <Button color="teal" variant="filled" onClick={onClose}>
            👑 Create Table
          </Button>{' '}
          {/* <Button
            color="teal"
            variant="filled"
            // onClick={() => {
            //   dispatch(
            //     action.updateColumnProperties({
            //       columnName: 'vendor_id',
            //       properties: {
            //         description: '',
            //         name: 'WHAT CIK',
            //         type: 'bigint',
            //       },
            //       tableName: 'public.transactions',
            //     })
            //   );
            // }}
          >
            👑 Create Table
          </Button>{' '} */}
          <Button color="red" onClick={onClose}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825L9.425 14.6L8 16Z"
                fill="#ffffff"
              />
            </svg>
          </Button>
        </Flex>
        {/* {tables.map((table) => {
          return <TableControl key={table.name} TableData={table} />;
        })} */}
      </Drawer.Body>
    </Drawer>
  );
}

export default DrawerControl;
