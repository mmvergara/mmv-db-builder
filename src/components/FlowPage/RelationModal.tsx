import { Modal, Text, Table, Button, Box, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { CustomNode, RelationType } from 'types/types';

interface Props {
  relations: RelationType[];
  tables: CustomNode[];
  // eslint-disable-next-line no-unused-vars
  onRelationAdd: (Relation: RelationType) => void;
  // eslint-disable-next-line no-unused-vars
  onRelationDelete: (Relation: RelationType) => void;
  onClose: () => void;
}

function RelationModal({
  onClose,
  onRelationAdd,
  tables,
  onRelationDelete,
  relations,
}: Props) {
  const [
    addRelationModal,
    { open: openAddRelationModal, close: closeAddRelationModal },
  ] = useDisclosure(false);

  const rows = relations.map((relation) => {
    const sourceTableName = relation.sourceTable;
    const targetTableName = relation.targetTable;
    const sourceColName = relation.sourceKey.replace(`${sourceTableName}-`, '');
    const targetColName = relation.targetKey.replace(`${targetTableName}-`, '');
    return (
      <tr>
        <td>{relation.relation}</td>
        <td>
          <b>{sourceTableName}</b>
          <p>{sourceColName}</p>
        </td>
        <td>
          <b>{targetTableName}</b>
          <p>{targetColName}</p>
        </td>
        <td>
          <Button color="red" onClick={() => onRelationDelete(relation)}>
            Delete
          </Button>
        </td>
      </tr>
    );
  });
  const opened = true;

  // Add Relation Modal
  const [sourceTable, setSourceTable] = useState<null | string>('');
  const [targetTable, setTargetTable] = useState<null | string>('');

  const [sourceColumn, setSourceColumn] = useState<null | string>('');
  const [targetColumn, setTargetColumn] = useState<null | string>('');

  const [relationType, setRelationType] =
    useState<RelationType['relation']>('one-to-many');

  type multiSelectData = { value: string; label: string }[] | null;
  const sourceTables: multiSelectData = tables.map((table) => {
    return { value: table.tableName, label: table.tableName };
  });

  const targetTables: multiSelectData = tables.map((table) => {
    return { value: table.tableName, label: table.tableName };
  });

  const sourceColumns: multiSelectData =
    tables
      .find((table) => table.tableName === sourceTable)
      ?.columns.map(({ colName }) => {
        return { value: colName, label: colName };
      }) || null;

  const targetColumns: multiSelectData =
    tables
      .find((table) => table.tableName === targetTable)
      ?.columns.map(({ colName }) => {
        return { value: colName, label: colName };
      }) || null;

  return (
    <>
      <Modal opened={opened} onClose={onClose} size="lg">
        <Modal.Body>
          <Text>Edit Relations</Text>
          <Button onClick={openAddRelationModal}>Add Relation</Button>
          <Table sx={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Relation Type</th>
                <th>Source</th>
                <th>Target</th>
                <th>{` `}</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Modal.Body>
      </Modal>
      {/* Add Relation Modal */}
      <Modal
        opened={addRelationModal}
        onClose={closeAddRelationModal}
        title="Add Relation"
        size="sm"
        withOverlay
        withCloseButton
        withinPortal
      >
        <Select
          data={[
            {
              value: 'one-to-many',
              label: 'one-to-many',
            },
            {
              value: 'many-to-one',
              label: 'many-to-one',
            },
            {
              value: 'one-to-one',
              label: 'one-to-one',
            },
            {
              value: 'many-to-many',
              label: 'many-to-many',
            },
          ]}
          onChange={(v) =>
            setRelationType((v as RelationType['relation']) || 'one-to-many')
          }
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Select data={sourceTables} onChange={setSourceTable} />
            <Select data={targetTables} onChange={setTargetTable} />
          </Box>{' '}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {sourceColumns && (
              <Select data={sourceColumns} onChange={setSourceColumn} />
            )}
            {targetColumns && (
              <Select data={targetColumns} onChange={setTargetColumn} />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default RelationModal;
