import { Relations, TableData } from 'utilities/types/dbTypes';
import { Xwrapper } from 'react-xarrows';
import { Box } from '@mantine/core';
import DraggableTable from 'components/DraggableTable';
import RelationArrows from 'components/RelationArrows';

type Props = {
  tables: TableData[];
  relations: Relations[];
  fontSize: number;
};

export default function MainDiagram({ tables, relations, fontSize }: Props) {
  return (
    <Xwrapper>
      <Box
        sx={{
          position: 'absolute',
          overflow: 'hidden',
          minHeight: '1300px',
          height: '100%',
          width: '100%',
        }}
      >
        {tables.map(({ tableName, columns }) => {
          return (
            <DraggableTable
              tableName={tableName}
              columns={columns}
              fontSize={fontSize}
            />
          );
        })}
        {relations.map((relation) => (
          <RelationArrows relationData={relation} fontSize={fontSize} />
        ))}
      </Box>
    </Xwrapper>
  );
}
