import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { ColorModeButton, NavBar } from 'components/elements';
import { BellIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const { address } = useAccount();

  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <Container my="5" maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
          <Link href="/">
            <Box rounded={'3xl'} bg={'white'}>
              <Text fontSize={'3xl'} mx="5" py="1" color={'black'} fontWeight={'bold'}>
                riot-router-protocol
              </Text>
            </Box>
          </Link>
          <NavBar />
          <HStack gap={'10px'}>
            <ConnectButton />
            <ColorModeButton />
            {/* Notifications Button */}
            <Button size="sm" id="sdk-trigger-id" isDisabled={!address}>
              <BellIcon /> <span className="ml-2">Alerts</span>
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
