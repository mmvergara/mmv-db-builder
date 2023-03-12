import { Button, Drawer, DrawerProps, Flex, TextInput } from '@mantine/core';
import { NodeType } from 'helpers/setNodesHandleType';
import { config } from 'process';
import { CustomNode, CustomNodeColumn } from 'types/types';
import uniqid from 'uniqid';

type Props = {
  updateTableName: (oldName: string, newName: string) => void;
  updateColumnProperties: (
    tableName: string,
    oldColName: string,
    newColProperties: CustomNodeColumn
  ) => void;
  nodes: NodeType[];
};

function DrawerControl(props: DrawerProps & Props) {
  const { onClose, nodes, updateTableName } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Drawer {...props}>
      <Drawer.Body m={0} h="100%">
        <Flex bg="#38235c" p="sm" justify="space-between">
          <Button color="teal" variant="filled" onClick={onClose}>
            👑 Create Tableaaaa
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
        {nodes.map((node, i) => {
          return (
            <TextInput
              key={i}
              value={node.id}
              onChange={(e) => {
                console.log(e)
                updateTableName(node.id, e.target.value);
              }}
            />
          );
        })}
      </Drawer.Body>
    </Drawer>
  );
}

export default DrawerControl;
