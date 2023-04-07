import { Box, Text } from '@mantine/core';

type props = {
  tableName: string;
  columnData: {
    columnName: string;
    columnType: string;
    columnIsKey: boolean;
  };
};

export default function TableColumn({ tableName, columnData }: props) {
  const { columnIsKey, columnName, columnType } = columnData;
  return (
    <Box
      id={`${tableName}.${columnName}`}
      sx={{
        display: 'flex',
        gap: 50,
        padding: '4px 10px',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        {columnIsKey && <Text>KEY</Text>}
        <Text>{columnName}</Text>
      </Box>
      <Text color="dimmed">{columnType}</Text>
    </Box>
  );
}
