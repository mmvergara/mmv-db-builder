import { useDisclosure } from '@mantine/hooks';
import { Box, Button, Collapse, Group, Text } from '@mantine/core';

function NavCollapseTable() {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Box maw={400} mx="auto">
      <Group position="center" mb={5}>
        <Button onClick={toggle}>Toggle with linear transition</Button>
      </Group>

      <Collapse
        in={opened}
        transitionDuration={300}
        transitionTimingFunction="linear"
      >
        <Text>zzzzz</Text>
      </Collapse>
    </Box>
  );
}

export default NavCollapseTable;
