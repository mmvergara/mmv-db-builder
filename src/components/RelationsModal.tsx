/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import {
  Button,
  Modal,
  ModalProps,
  Table,
  Title,
  Select,
  Box,
  Divider,
  SegmentedControl,
  Text,
  Alert,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { randomId } from 'utilities/helpers';
import {
  editorValToDMBLObject,
  relationDataToDMBLRelation,
} from 'utilities/parsers';
import { Relations, TableData } from 'utilities/types/dbTypes';

type Props = ModalProps & {
  setRelations: Dispatch<SetStateAction<Relations[]>>;
  editorValue: string;
  relations: Relations[];
  tables: TableData[];
};

export default function RelationsModal(props: Props) {
  const { setRelations, editorValue, tables, relations, ...modalProps } = props;
  const [relationType, setRelationType] =
    useState<Relations['relation']>('one-to-one');
  const [source_table, setSourceTable] = useState<string>('');
  const [source_column, setSourceColumn] = useState<string>('');
  const [target_table, setTargetTable] = useState<string>('');
  const [target_column, setTargetColumn] = useState<string>('');

  const source_table_options = tables
    .map((t) => t.tableName)
    .filter((t) => t !== target_table);
  const target_table_options = tables
    .map((t) => t.tableName)
    .filter((t) => t !== source_table);

  const source_column_options =
    tables
      .find((t) => t.tableName === source_table)
      ?.columns.map((c) => c.columnName) || [];
  const target_column_options =
    tables
      .find((t) => t.tableName === target_table)
      ?.columns.map((c) => c.columnName) || [];
  const relation_options: {
    label: Relations['relation'];
    value: Relations['relation'];
  }[] = [
    { label: 'one-to-one', value: 'one-to-one' },
    { label: 'one-to-many', value: 'one-to-many' },
    { label: 'many-to-one', value: 'many-to-one' },
    { label: 'many-to-many', value: 'many-to-many' },
  ];
  const none = { label: 'none', value: '' };

  const CustomNewRelation = {
    relation: relationType,
    source_table,
    source_column,
    target_table,
    target_column,
  };

  const handleAddRelation = () => {
    let dmblRelationsString: string = '\n';
    [...relations, CustomNewRelation].forEach((r) => {
      dmblRelationsString += `Ref: ${relationDataToDMBLRelation(r)}\n`;
    });
    const { error } = editorValToDMBLObject(editorValue + dmblRelationsString);
    if (error) {
      showNotification({
        message: error.split('-')[1].trim(),
        color: 'red',
      });
      return;
    }
    setRelations((p) => [...p, CustomNewRelation]);
    showNotification({
      message: 'Relation Added',
      color: 'green',
    });
  };

  const handleDeleteRelation = (relationToDel: Relations) => {
    let newRelations: Relations[] = [];
    setRelations((prev) => {
      newRelations = prev.filter((r) => {
        return !(
          r.relation === relationToDel.relation &&
          r.source_table === relationToDel.source_table &&
          r.source_column === relationToDel.source_column &&
          r.target_table === relationToDel.target_table &&
          r.target_column === relationToDel.target_column
        );
      });
      return newRelations;
    });
    showNotification({
      message: 'Relation Deleted',
      color: 'green',
    });
  };

  const guidingText = `
  ${relationType.split('-')[0]} ${source_table}.${source_column} =TO= ${
    relationType.split('-')[2]
  } ${target_table}.${target_column}
  `;
  return (
    <Modal
      {...modalProps}
      size="lg"
      styles={{
        inner: { zIndex: 1000 },
        body: { backgroundColor: '#ebf4ff' },
        header: { backgroundColor: '#282c34', padding: 12 },
        overlay: { zIndex: 999 },
      }}
    >
      <Title order={5} my={10}>
        Edit Relations
      </Title>
      <SegmentedControl
        value={relationType}
        data={relation_options}
        onChange={(v: Relations['relation']) => {
          setRelationType(v);
        }}
        style={{ width: '100%', backgroundColor: 'lightblue' }}
      />
      <Box sx={{ display: 'flex', gap: 5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Select
            label="Source Table"
            value={source_table}
            data={[...source_table_options, none]}
            onChange={(v) => {
              setSourceTable(v || '');
              setSourceColumn('');
            }}
          />
          {!!source_table && (
            <Select
              label="Source Column"
              value={source_column}
              data={[...source_column_options, none]}
              onChange={(v) => setSourceColumn(v || '')}
            />
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Select
            label="Target Table"
            value={target_table}
            data={[...target_table_options, none]}
            onChange={(v) => {
              setTargetTable(v || '');
              setTargetColumn('');
            }}
          />
          {!!target_table && (
            <Select
              label="target Column"
              value={target_column}
              data={[...target_column_options, none]}
              onChange={(v) => setTargetColumn(v || '')}
            />
          )}
        </Box>{' '}
      </Box>
      <Alert color="cyan" variant="filled">
        <Text align="center" sx={{ fontWeight: 600 }}>
          {`${relationType
            .split('-')[0]
            .toLocaleUpperCase()} ${source_table}.${source_column}`}
          <br />
          =To=
          <br />
          {`${relationType
            .split('-')[2]
            .toLocaleUpperCase()} ${target_table}.${target_column}`}
        </Text>
      </Alert>
      <Button onClick={handleAddRelation} sx={{ width: '100%', marginTop: 20 }}>
        Add Relation
      </Button>
      <Divider my={20} color="#282c34" sx={{ borderWidth: 2 }} />
      <Table mt={20}>
        <tbody>
          {relations.flatMap((r) => {
            return (
              <tr key={randomId(r.source_table)}>
                <td>
                  <b>{r.source_table}</b>
                  <br />
                  {r.source_column}
                </td>
                <td>{r.relation}</td>
                <td>
                  <b>{r.target_table}</b>
                  <br />
                  {r.target_column}
                </td>
                <td>
                  <Button
                    color="red"
                    sx={{ width: '100%' }}
                    onClick={() => {
                      handleDeleteRelation(r);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Modal>
  );
}
