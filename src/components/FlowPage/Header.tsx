import { Button, Flex, Header } from '@mantine/core';

type Props = {
  drawerClose: () => void;
  drawerOpen: () => void;
};

function FlowHeader({ drawerOpen, drawerClose }: Props) {
  return (
    <Header
      withBorder={false}
      height={{ base: 61 }}
      p="md"
      bg="ocean-blue"
      style={{ boxShadow: '0px 1px 5px gray' }}
    >
      <Flex
        style={{
          alignItems: 'center',
          height: '100%',
          gap: '20px',
        }}
      >
        <Button onClick={drawerOpen} color="dark" variant="filled">
          Show Controls
        </Button>
        <Button onClick={drawerOpen} color="ocean-blue" variant="white">
          Export Database
        </Button>
      </Flex>
    </Header>
  );
}
export default FlowHeader;
