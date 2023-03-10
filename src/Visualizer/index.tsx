/* eslint-disable no-unused-vars */
import {
  AppShell,
  Button,
  Divider,
  Drawer,
  Flex,
  Header,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import Flow from './Flow';
import { loadDatabases } from './helpers/loadDatabases';
import { DatabaseConfig } from '../types/DatabaseConfig';

interface VisualizerProps {
  // eslint-disable-next-line react/require-default-props
  database?: string;
}

// https://codesandbox.io/s/elastic-elion-dbqwty?file=/src/App.js
// eslint-disable-next-line import/no-anonymous-default-export
function Visualizer(props: VisualizerProps) {
  const [currentDatabase, setCurrentDatabase] = useState({
    tables: [],
    edgeConfigs: [],
    schemaColors: {},
    tablePositions: {},
  } as DatabaseConfig);

  const [databasesLoaded, setDatabasesLoaded] = useState(false);
  const { database } = props;
  useEffect(() => {
    loadDatabases()
      .then((data) => {
        if (!database || !(database in data)) {
          return 's';
        }
        const databaseConfig = data[database as string] as DatabaseConfig;
        setCurrentDatabase(databaseConfig);
        setDatabasesLoaded(true);
        return 's';
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);
  return (
    <AppShell
      header={
        <Header
          withBorder={false}
          height={{ base: 61 }}
          p="md"
          bg="#38235c"
          style={{ boxShadow: '0px 1px 5px gray' }}
        >
          <Flex
            style={{
              alignItems: 'center',
              height: '100%',
              gap: '20px',
            }}
          >
            <Button onClick={drawerOpen}>Show Controls</Button>
            <Button onClick={drawerOpen} variant="light">
              Export Database
            </Button>
          </Flex>
        </Header>
      }
    >
      <Drawer
        size={320}
        opened={drawerOpened}
        withOverlay={false}
        onClose={drawerClose}
        withCloseButton={false}
        padding={0}
        shadow="sm"
      >
        <Drawer.Body m={0} bg="#673ab2" h="100%">
          <Flex bg="#38235c" p="sm" justify="space-between">
            <Button color="teal" variant="filled" onClick={drawerClose}>
              👑 Create Table
            </Button>{' '}
            <Button color="red" onClick={drawerClose}>
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
          <Divider />
        </Drawer.Body>
      </Drawer>
      <ReactFlowProvider>
        {databasesLoaded && <Flow currentDatabase={currentDatabase} />}
      </ReactFlowProvider>
    </AppShell>
  );
}

export default Visualizer;
