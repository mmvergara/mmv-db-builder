/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { DotsVertical, Trash } from 'tabler-icons-react';
import { TableNodeType } from 'types/types';

interface Props {
  node: TableNodeType;
  index: number;
  updateTableName: (nodeId: string, newTableName: string) => void;
  updateColumnName: (
    nodeId: string,
    colIndex: number,
    newColName: string
  ) => void;
  updateColumnDataType: (
    nodeId: string,
    colIndex: number,
    newColDataType: string
  ) => void;
  updateColumnIsKey: (
    nodeId: string,
    colIndex: number,
    newColIsKey: boolean
  ) => void;
  removeColumn: (nodeId: string, colName: string) => void;
  removeTable: (nodeId: string) => void;
  addColumn: (nodeId: string) => void;
}

function DrawerTable({
  node,
  index,
  addColumn,
  removeTable,
  removeColumn,
  updateTableName,
  updateColumnDataType,
  updateColumnIsKey,
  updateColumnName,
}: Props) {
  const [newTableName, setNewTableName] = useState(node.id);
  const [modalOpened, { open: modalOpen, close: modalClose }] =
    useDisclosure(false);
  const [tableExpanded, { toggle: toggleTable }] = useDisclosure(false);
  return (
    <Flex direction="column" h="100%">
      <Flex w="100%" align="center" bg="#0E99AC" p={4} h="100%">
        <Text
          style={{
            flex: 5,
            cursor: 'pointer',
          }}
          align="center"
          fw={600}
          color="white"
          onClick={toggleTable}
        >
          {node.id}
        </Text>
        <Button
          color="cyan"
          variant="outline"
          px={4}
          style={{ border: 'none' }}
          onClick={() => modalOpen()}
        >
          <DotsVertical size={30} strokeWidth={2} color="white" />
        </Button>
        <Modal opened={modalOpened} onClose={modalClose}>
          <Box p={4}>
            <TextInput
              value={newTableName}
              onChange={(e) => {
                setNewTableName(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                removeTable(node.id);
                modalClose();
              }}
            >
              Delete Table
            </Button>
            <Button
              onClick={() => {
                updateTableName(node.id, newTableName);
                modalClose();
              }}
            >
              Update Table Name
            </Button>
          </Box>
        </Modal>
      </Flex>
      <Collapse in={tableExpanded}>
        {node.data.columns.map((col, i) => {
          return (
            <Flex key={i} align="center">
              <TextInput
                key={i}
                value={col.colName}
                onChange={(e) => {
                  updateColumnName(node.id, i, e.target.value);
                }}
                placeholder="Column Name"
                radius="0"
              />{' '}
              <TextInput
                key={i}
                value={col.colDataType}
                onChange={(e) => {
                  updateColumnDataType(node.id, i, e.target.value);
                }}
                placeholder="Data Type"
                radius="0"
              />
              <Button
                color="teal"
                variant="default"
                px={4}
                radius="0"
                onClick={() => updateColumnIsKey(node.id, i, !col.colIsKey)}
              >
                <Text mx={10}>Key</Text>
                <Checkbox
                  checked={col.colIsKey}
                  onChange={(e) =>
                    updateColumnIsKey(node.id, i, e.target.checked)
                  }
                  mr={5}
                />
              </Button>
              <Button
                onClick={() => removeColumn(node.id, col.colName)}
                color="red"
                variant="filled"
                px={4}
                radius="0"
              >
                <Trash size={20} strokeWidth={2} color="white" />
              </Button>
            </Flex>
          );
        })}
        <Button
          onClick={() => addColumn(node.id)}
          color="green"
          variant="outline"
          style={{ border: 0, borderRadius: 0, width: '100%' }}
        >
          Add Column
        </Button>
      </Collapse>
    </Flex>
  );
}

export default DrawerTable;
