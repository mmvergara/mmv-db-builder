import { Container, Title, Button, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container>
      <Container pt={200}>
        <Title order={1} ta="center">
          👑 Crown DB Builder
        </Title>
        <Text ta="center">Made By Vergara</Text>
        <Title order={2} ta="center">
          Mark Matthew M. PSAU Student
        </Title>
        <Flex
          mih={50}
          gap="md"
          mt={30}
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Button to="/editor" component={Link} variant="gradient">
            Create New Database
          </Button>
          <Button variant="filled" color="teal">
            Load DB JSON file
          </Button>
        </Flex>
      </Container>
    </Container>
  );
}

export default HomePage;
