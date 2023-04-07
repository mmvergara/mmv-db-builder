import { Box } from '@mantine/core';
import DraggableTable from 'components/DraggableTable';
import Xarrow, { Xwrapper } from 'react-xarrows';

export default function diagramPage() {
  return (
    <Box>
      <Box sx={{ width: '100%', backgroundColor: 'red', padding: 10 }}>
        {' '}
        NAV BAR
      </Box>
      <Xwrapper>
        <Box
          sx={{
            position: 'absolute',
            overflow: 'hidden',
            border: '2px solid green',
            height: '100%',
            width: '100%',
          }}
        >
          <DraggableTable name="Table 1" />
          <DraggableTable name="Table 2" />
          <DraggableTable name="Table 4" />
          <Xarrow path="grid" start="Table 1.yoyo" end="Table 2.yoyo" />
        </Box>
      </Xwrapper>
    </Box>
  );
}
