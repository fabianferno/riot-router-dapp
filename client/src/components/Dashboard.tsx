import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Spacer,
  StackDivider,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CreateDeviceModal from './CreateDeviceModal';
import CreateOrganisationModal from './CreateOrganisationModal';
import { polygonABI, deployments, generalABI, polygonAddress } from '../utils/constants';
import ViewData from '../pages/view-data';
import TransferDeviceModal from './TransferDeviceModal';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import TransferCrossChainModal from './TransferCrossChainModal';

const Dashboard = () => {
  const [showTransfersModal, setShowTransfersModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [description, setDescription] = useState('');
  const [selectedOrganisation, setSelectedOrganisation] = useState({});
  const [selected, setSelected] = useState('0');
  const [uploadToken, setUploadToken] = useState(null);
  const [showCreateOrganisation, setShowCreateOrganisation] = useState(false);
  const [showCreateDeviceModal, setShowCreateDeviceModal] = useState(false);
  const { data: organisations } = useContractRead({
    address: polygonAddress,
    abi: polygonABI,
    functionName: 'getOrganisations',
    args: [address],
    chainId: 80001,
  });

  const { data: devices } = useContractRead({
    address: polygonAddress,
    abi: polygonABI,
    functionName: 'getOrganisationDevices',
    args: [selectedOrganisation?.id],
    chainId: 80001,
  });
  useEffect(() => {
    if (organisations && organisations.length > 0) {
      setSelectedOrganisation(organisations[0]);
      setSelected('1');
    }

    console.log('Devices');
    console.log(devices);
  }, []);

  useEffect(() => {
    if (selectedOrganisation != {}) {
      fetch(selectedOrganisation.metadata)
        .then((res) => res.json())
        .then((res) => setDescription(res.description));
    }
  }, [selected]);
  return (
    <>
      <Box fontSize="3xl" fontWeight={'bold'} marginBottom={'20px'}>
        Dashboard
      </Box>
      <Divider marginBottom={'20px'} />
      <Grid h="900px" templateRows="repeat(5, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={5} colSpan={1} bg="#141214">
          <VStack
            divider={<StackDivider borderColor="gray.900" />}
            spacing={4}
            align="stretch"
            padding="10px"
            borderRadius={'md'}
          >
            {organisations &&
              organisations.map((org: any) => (
                <Box
                  as="button"
                  h="40px"
                  p="2"
                  textAlign={'center'}
                  bg={selected == parseInt(org.id) + 1 ? 'gray.200' : 'gray.800'}
                  borderRadius={'md'}
                  fontWeight={'medium'}
                  textColor={selected == parseInt(org.id) + 1 ? 'black' : 'white'}
                  alignItems="center"
                  justifyContent={'center'}
                  onClick={() => {
                    setSelected(parseInt(org.id) + 1);
                    setSelectedOrganisation(org);
                  }}
                >
                  {`${org.name} | ${org.symbol}`}
                </Box>
              ))}
            <Box
              as="button"
              h="40px"
              p="2"
              textAlign={'center'}
              _hover={{ bg: 'gray.200', textColor: 'black' }}
              bg={'gray.600'}
              borderRadius={'md'}
              fontWeight={'medium'}
              textColor={'white'}
              alignItems="center"
              justifyContent={'center'}
              onClick={() => {
                if (chain?.id != 80001) {
                  alert('Please switch to Mumbai Testnet to create an organisation');
                } else {
                  // Create Organisation
                  setShowCreateOrganisation(true);
                }
              }}
            >
              {'➕ Create'}
            </Box>
          </VStack>
        </GridItem>
        <GridItem h="200px" colSpan={4} rowSpan={1} bg="#141214" borderRadius={'md'} marginBottom={'20px'}>
          <Flex>
            <Text fontSize="3xl" fontWeight={'bold'} margin={'20px'}>
              {selected != '0' &&
                `${selectedOrganisation != {} && selectedOrganisation.name} | ${
                  selectedOrganisation != {} && selectedOrganisation.symbol
                }`}
            </Text>
            <Spacer />
            <Button
              margin={'20px'}
              disabled={selected == '0'}
              onClick={() => {
                if (chain?.id != 80001) {
                  alert('Please switch to Mumbai Testnet to create a device');
                } else {
                  setShowCreateDeviceModal(true);
                }
              }}
            >
              ➕ Create Device
            </Button>
          </Flex>
          <Divider marginBottom={'20px'} borderColor="gray.900" />
          <Text margin={'20px'}>{selected != '0' && selectedOrganisation != {} && description}</Text>
        </GridItem>

        <GridItem colSpan={2} rowSpan={4} bg="#141214" borderRadius={'md'} marginBottom={'20px'}>
          <Text fontSize="3xl" fontWeight={'bold'} margin={'20px'}>
            {'Devices'}
          </Text>
          <Divider marginBottom={'20px'} borderColor="gray.900" />
          <VStack spacing={2} align="stretch" padding="10px" borderRadius={'md'}>
            {devices != undefined && devices.length > 0 ? (
              devices.map((device: any, index) => (
                <Grid
                  key={index}
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(4, 1fr)"
                  as="button"
                  h="120px"
                  p="2"
                  bg={'gray.800'}
                  borderRadius={'md'}
                  fontWeight={'medium'}
                  textColor={'white'}
                  _hover={{ bg: 'gray.200', textColor: 'black' }}
                  onClick={() => {
                    if (chain?.id != 80001) {
                      alert('Please switch to Mumbai Testnet to transfer ownership ');
                    } else {
                      setShowTransfersModal(true);
                      setSelectedDevice(device.deviceId);
                    }
                  }}
                >
                  <GridItem colSpan={1} rowSpan={2}>
                    <Image src="https://picsum.photos/100" alt={device.subscriber} />
                  </GridItem>
                  <GridItem colSpan={3} rowSpan={1}>
                    <Text textAlign="start" fontWeight={'bold'}>
                      Subscriber Address
                    </Text>
                    <Text textAlign="start" fontWeight="normal" fontSize={'12px'}>
                      {device.subscriber}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={3} rowSpan={1} paddingBottom="25px">
                    <Text textAlign="start" fontWeight={'bold'}>
                      Device Id
                    </Text>
                    <Text textAlign={'start'} fontWeight="normal" fontSize={'12px'}>
                      {device.deviceId}
                    </Text>
                  </GridItem>
                </Grid>
              ))
            ) : (
              <Text margin={'100px'}>No Devices Yet!</Text>
            )}
          </VStack>
        </GridItem>
        <GridItem colSpan={2} rowSpan={4} bg="#141214" borderRadius={'md'} marginBottom={'20px'}>
          <Text fontSize="3xl" fontWeight={'bold'} margin={'20px'}>
            {'View Data'}
          </Text>
          <Divider marginBottom={'20px'} borderColor="gray.900" />
          <VStack spacing={2} align="stretch" padding="10px" borderRadius={'md'}>
            {devices && devices.length > 0 ? <ViewData /> : <Text margin={'100px'}>No Data Yet!</Text>}
          </VStack>
        </GridItem>
      </Grid>
      <TransferDeviceModal
        isOpen={showTransfersModal}
        onClose={() => {
          setShowTransfersModal(false);
        }}
        deviceId={selectedDevice}
        organisationContractAddress={organisations && organisations[parseInt(selected) - 1]?.address}
      />
      <CreateOrganisationModal
        isOpen={showCreateOrganisation}
        onClose={() => {
          setShowCreateOrganisation(false);
        }}
      />
      {organisations != undefined && organisations.length > 0 && (
        <CreateDeviceModal
          isOpen={showCreateDeviceModal}
          organisationId={selectedOrganisation.id}
          onClose={() => {
            setShowCreateDeviceModal(false);
          }}
          // organisationAddress={organisations && organisations[parseInt(selected) - 1].address}
        />
      )}
    </>
  );
};

export default Dashboard;
