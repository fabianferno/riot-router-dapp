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
import { useSelector } from 'react-redux';
import CreateDeviceModal from './CreateDeviceModal';
import CreateOrganisationModal from './CreateOrganisationModal';
import { organisationABI, protocolABI, protocolAddress } from './metamask/lib/constants';
import contractCall from './metamask/lib/contract-call';
import ViewData from '../pages/view-data';
import TransferDeviceModal from './TransferDeviceModal';

const Dashboard = () => {
  const [showTransfersModal, setShowTransfersModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const { currentAccount } = useSelector((state: any) => state.metamask);

  const [selected, setSelected] = useState('0');
  const [uploadToken, setUploadToken] = useState(null);
  const [showCreateOrganisation, setShowCreateOrganisation] = useState(false);
  const [showCreateDeviceModal, setShowCreateDeviceModal] = useState(false);
  const [organisations, setOrganisations] = useState<any>([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    (async function () {
      if (selected != '0') {
        const _devices = await contractCall(
          organisations[parseInt(selected) - 1]?.address,
          currentAccount,
          organisationABI,
          [],
          0,
          'getDevices()',
          true,
        );
        setDevices(_devices);
        let modifiedOrganisations = organisations.map((org: Object, index: number) => {
          if (index == parseInt(selected) - 1) {
            return { ...org, description: 'This is so awesome!' };
          }
          return org;
        });
      }
    })();
  }, [selected]);
  useEffect(() => {
    (async function () {
      const _organisations = await contractCall(
        protocolAddress,
        currentAccount,
        protocolABI,
        [],
        0,
        'getOrganisations()',
        true,
      );
      console.log(_organisations);
      if (_organisations.length > 0) {
        let formattedOrganisations: any = [];
        for (let i = 0; i < _organisations.length; i++) {
          // const fetchedDescription = await fetch(_organisations[i].metadata + '/metadata.json');
          // const { description } = await fetchedDescription.json();
          formattedOrganisations.push({
            name: _organisations[i].name,
            id: (i + 1).toString(),
            address: _organisations[i].organisationContractAddress,
            symbol: _organisations[i].symbol,
            // description: description,
            creator: _organisations[i].creator,
          });
        }
        console.log('Organisations: ', formattedOrganisations);
        setOrganisations(formattedOrganisations);
        setSelected('1');
        const _devices = await contractCall(
          formattedOrganisations[0]?.address,
          currentAccount,
          organisationABI,
          [],
          0,
          'getDevices()',
          true,
        );

        setDevices(_devices);
      }
    })();
  }, []);
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
            {organisations.map((org: any) => (
              <Box
                as="button"
                h="40px"
                p="2"
                textAlign={'center'}
                bg={selected == org.id ? 'gray.200' : 'gray.800'}
                borderRadius={'md'}
                fontWeight={'medium'}
                textColor={selected == org.id ? 'black' : 'white'}
                alignItems="center"
                justifyContent={'center'}
                onClick={() => setSelected(org.id)}
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
                // Create Organisation
                setShowCreateOrganisation(true);
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
                `${organisations[parseInt(selected) - 1].name} | ${organisations[parseInt(selected) - 1].symbol}`}
            </Text>
            <Spacer />
            <Button
              margin={'20px'}
              disabled={selected == '0'}
              onClick={() => {
                setShowCreateDeviceModal(true);
              }}
            >
              ➕ Create Device
            </Button>
          </Flex>
          <Divider marginBottom={'20px'} borderColor="gray.900" />
          <Text margin={'20px'}>{selected != '0' && organisations[parseInt(selected) - 1].description}</Text>
        </GridItem>

        <GridItem colSpan={2} rowSpan={4} bg="#141214" borderRadius={'md'} marginBottom={'20px'}>
          <Text fontSize="3xl" fontWeight={'bold'} margin={'20px'}>
            {'Devices'}
          </Text>
          <Divider marginBottom={'20px'} borderColor="gray.900" />
          <VStack spacing={2} align="stretch" padding="10px" borderRadius={'md'}>
            {/* {devices.length > 0 ? (
              devices.map((device: any, index) => (
                <Grid
                  key={index}
                  onClick={() => {
                    setShowTransfersModal(true);
                    setSelectedDevice(device.deviceId);
                  }}
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
                  // onClick={() => setSelected(org.id)}
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
            )} */}
          </VStack>
        </GridItem>
        <GridItem colSpan={2} rowSpan={4} bg="#141214" borderRadius={'md'} marginBottom={'20px'}>
          <Text fontSize="3xl" fontWeight={'bold'} margin={'20px'}>
            {'View Data'}
          </Text>
          <Divider marginBottom={'20px'} borderColor="gray.900" />
          <VStack spacing={2} align="stretch" padding="10px" borderRadius={'md'}>
            {devices.length > 0 ? <ViewData /> : <Text margin={'100px'}>No Data Yet!</Text>}
          </VStack>
        </GridItem>
      </Grid>
      <TransferDeviceModal
        isOpen={showTransfersModal}
        onClose={() => {
          setShowTransfersModal(false);
        }}
        deviceId={selectedDevice}
        organisationContractAddress={organisations[parseInt(selected) - 1]?.address}
      />
      <CreateOrganisationModal
        isOpen={showCreateOrganisation}
        onClose={() => {
          setShowCreateOrganisation(false);
        }}
      />
      {organisations.length > 0 && (
        <CreateDeviceModal
          isOpen={showCreateDeviceModal}
          onClose={() => {
            setShowCreateDeviceModal(false);
          }}
          organisationAddress={organisations[parseInt(selected) - 1].address}
        />
      )}
    </>
  );
};

export default Dashboard;
