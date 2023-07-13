import {
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  SlideFade,
  Text,
  Textarea,
} from '@chakra-ui/react';
import crypto from 'crypto';

import React, { useEffect, useState } from 'react';
import { polygonABI, polygonAddress, riotDeviceImages, RIOT_RPC_URL } from '../utils/constants';
import getIsDeviceIdMinted from 'utils/getIsDeviceMinted';
import { getEllipsisTxt } from 'utils/format';
import getSessionSalt from 'utils/getSessionSalt';
import { convertObjectToFile, getUploadToken } from 'utils';
import { upload } from '@spheron/browser-upload';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';

const CreateDeviceModal = ({
  isOpen,
  organisationId,
  onClose,
}: {
  isOpen: boolean;
  organisationId: string;
  onClose: () => void;
}) => {
  const { address } = useAccount();

  const { data: deviceTokenId } = useContractRead({
    address: polygonAddress,
    abi: polygonABI,
    functionName: 'getDevicesCount',
  });

  const [buttonAction, setButtonAction] = useState(0);
  const [metadataHash, setMetadataHash] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [firmwareHash, setFirmwareHash] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceDataHash, setDeviceDataHash] = useState(
    '0x' + crypto.createHash('sha256').update('').digest().toString('hex'),
  );
  const [deviceGroupIdHash, setDeviceGroupIdHash] = useState(
    '0x' + crypto.createHash('sha256').update('dg_1').digest().toString('hex'),
  );
  const [systemName, setSystemName] = useState('esp8266');
  const [releaseName, setReleaseName] = useState('2.2.0-dev(9422289)');
  const [firmwareVersion, setFirmwareVersion] = useState('v1.19.1 on 2022-06-18');
  const [chipName, setChipName] = useState('ESP module (1M) with ESP8266');
  const [chipId, setChipId] = useState('42c1dd00');
  const [deviceMinted, setDeviceMinted] = useState(false);
  const [status, setStatus] = useState('');
  const [sessionSalt, setSessionSalt] = useState('');
  const closeNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    (async function () {
      const { randomness } = await getSessionSalt();
      setSessionSalt(randomness);
    })();
  }, []);

  const { data: isDeviceMinted } = useContractRead({
    address: polygonAddress,
    abi: polygonABI,
    functionName: 'isDeviceMinted',
    args: [deviceId],
    chainId: 80001,
  });

  const { isSuccess, writeAsync: createDevice } = useContractWrite({
    address: polygonAddress,
    abi: polygonABI,
    functionName: 'createDevice',
    args: [
      [
        organisationId,
        deviceId,
        firmwareHash,
        deviceDataHash,
        deviceGroupIdHash,
        sessionSalt.slice(0, -32),
        metadataHash,
      ],
    ],
  });

  async function hashify(contents: any) {
    const response = await fetch(`${RIOT_RPC_URL}/hashify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    });
    const { hash } = await response.json();
    return `0x${hash}`;
  }

  function computeDeviceDataHash() {
    const deviceData = systemName + releaseName + firmwareVersion + chipName + chipId;
    setDeviceDataHash('0x' + crypto.createHash('sha256').update(deviceData).digest().toString('hex'));
  }

  useEffect(() => {
    computeDeviceDataHash();
  }, [
    firmwareHash,
    deviceId,
    deviceDataHash,
    deviceGroupIdHash,
    systemName,
    releaseName,
    firmwareVersion,
    chipName,
    chipId,
  ]);
  function allDataPresent() {
    const condition =
      firmwareHash != '' &&
      deviceId != '' &&
      deviceDataHash != '' &&
      deviceGroupIdHash != '' &&
      systemName != '' &&
      releaseName != '' &&
      firmwareVersion != '' &&
      chipName != '' &&
      chipId != '';

    return condition;
  }
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-500 opacity-30"></div>
      <div className="bg-black border-2 border-white rounded-lg p-6">
        <div>
          <Text fontSize="5xl" fontWeight="bold" mb="20px">
            Mint a new device
          </Text>
          <form>
            <div>
              <Text mt="20px" mb="8px">
                Device ID
              </Text>
              <Input
                onChange={async (e) => {
                  setDeviceId(e.target.value);
                  computeDeviceDataHash();
                }}
                placeholder="Enter the device address"
              />
            </div>
            <SimpleGrid columns={2} spacing={2}>
              <div>
                <Text mt="20px" mb="8px">
                  Chip ID / MAC address
                </Text>
                <Input
                  onChange={(e) => {
                    setChipId(e.target.value);
                    computeDeviceDataHash();
                  }}
                  defaultValue={'42c1dd00'}
                  placeholder="Enter the chip ID"
                />
              </div>

              <div>
                <Text mt="20px" mb="8px">
                  Device Group ID
                </Text>
                <Input
                  onChange={async (e) => {
                    let hash = '0x' + crypto.createHash('sha256').update(e.target.value).digest().toString('hex');
                    setDeviceGroupIdHash(hash);
                    computeDeviceDataHash();
                  }}
                  defaultValue={'dg_1'}
                  placeholder="Enter the device group ID"
                />
              </div>

              <div>
                <Text mt="20px" mb="8px">
                  System name
                </Text>
                <Input
                  onChange={(e) => {
                    setSystemName(e.target.value);
                    computeDeviceDataHash();
                  }}
                  defaultValue={'esp8266'}
                  placeholder="Enter the system name"
                />
              </div>

              <div>
                <Text mt="20px" mb="8px">
                  Release Name
                </Text>
                <Input
                  onChange={(e) => {
                    setReleaseName(e.target.value);
                    computeDeviceDataHash();
                  }}
                  defaultValue={'2.2.0-dev(9422289)'}
                  placeholder="Enter the release name"
                />
              </div>

              <div>
                <Text mt="20px" mb="8px">
                  Firmware Version
                </Text>
                <Input
                  onChange={(e) => {
                    setFirmwareVersion(e.target.value);
                    computeDeviceDataHash();
                  }}
                  defaultValue={'v1.19.1 on 2022-06-18'}
                  placeholder="Enter the firmware version"
                />
              </div>

              <div>
                <Text mt="20px" mb="8px">
                  Chip Name
                </Text>
                <Input
                  onChange={(e) => {
                    setChipName(e.target.value);
                    computeDeviceDataHash();
                  }}
                  defaultValue={'ESP module (1M) with ESP8266'}
                  placeholder="Enter the chip name"
                />
              </div>
            </SimpleGrid>

            <div>
              <Text mt="20px" mb="8px">
                Firmware
              </Text>
              <Textarea
                rows={3}
                onChange={(e) => {
                  let firmware = e.target.value;
                  firmware = firmware.replaceAll(' ', '');
                  firmware = firmware.replaceAll('\r', '');

                  hashify(firmware).then((hash) => {
                    console.log(hash);
                    setFirmwareHash(hash);
                  });
                  computeDeviceDataHash();
                }}
                placeholder="Paste the contents of main.py here"
              />
            </div>

            <Box mt={5} mb={3}>
              <hr />
            </Box>

            <SimpleGrid columns={4} spacing={2}>
              <Flex my={'2'}>
                <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                  <Text fontWeight="bold">
                    <Badge colorScheme="green">Firmware Hash</Badge>
                  </Text>
                  <Text fontSize="sm">{getEllipsisTxt(firmwareHash, 10)}</Text>
                </Box>
              </Flex>

              <Flex my={'2'}>
                <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                  <Text fontWeight="bold">
                    <Badge colorScheme="orange">Device Metadata Hash</Badge>
                  </Text>
                  <Text fontSize="sm">{getEllipsisTxt(deviceDataHash, 10)}</Text>
                </Box>
              </Flex>

              <Flex my={'2'}>
                <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                  <Text fontWeight="bold">
                    <Badge colorScheme="purple">Device Group ID Hash</Badge>
                  </Text>
                  <Text fontSize="sm">{getEllipsisTxt(deviceGroupIdHash, 10)}</Text>
                </Box>
              </Flex>

              <Flex my={'2'}>
                <Box borderWidth="1px" borderRadius="lg" p={2} w={'100%'}>
                  <Text fontWeight="bold">
                    <Badge colorScheme="red">Token Id</Badge>
                  </Text>
                  <Text fontSize="sm">{deviceTokenId && deviceTokenId.toString()}</Text>
                </Box>
              </Flex>
            </SimpleGrid>

            <Box mt={3} mb={3}>
              <hr />
            </Box>

            <Flex mt={5} justifyContent={'space-between'}>
              <Text fontSize={'2xl'}>
                <strong>Token Ingredients</strong>
              </Text>
              <div>
                <Button colorScheme="red" onClick={onClose}>
                  Close
                </Button>
                <Button
                  mx={6}
                  colorScheme="teal"
                  variant="outline"
                  isDisabled={!allDataPresent() || isDeviceMinted}
                  onClick={async () => {
                    if (buttonAction == 0) {
                      setStatus('Uploading RiotNFT to IPFS...');
                      setShowNotification(true);
                      let _metadataHash;
                      try {
                        const storageToken = await getUploadToken();
                        const metadataObject = {
                          name: 'Riot Association',
                          symbol: 'RA',
                          groupId: deviceGroupIdHash,
                          systemName,
                          releaseName,
                          chipName,
                          chipId,
                          deviceId: deviceId,
                          image: riotDeviceImages[Math.floor(Math.random() * riotDeviceImages.length)],
                          deviceDataHash: deviceDataHash,
                        };
                        let currentlyUploaded = 0;
                        const { cid } = await upload([convertObjectToFile(metadataObject, 'metadata.json')], {
                          token: storageToken,
                          onChunkUploaded(uploadedSize, totalSize) {
                            currentlyUploaded += uploadedSize;
                            console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
                          },
                        });

                        _metadataHash = `https://ipfs.io/ipfs/${cid}/metadata.json`;

                        console.log('IPFS Hash of the deployed Riot NFT: ' + _metadataHash);
                        setMetadataHash(_metadataHash);
                        setButtonAction(1);
                        setStatus('Successfully stored the RiotNFT in IPFS. Click on Mint Device to mint the device.');
                      } catch (e) {
                        console.log(e);
                      }
                    } else {
                      try {
                        setStatus('Waiting for Confirmation...');
                        await createDevice();
                        setStatus('Transaction Sent!');
                        setShowNotification(true);
                      } catch (e) {
                        setStatus('Transaction Rejected');
                      }
                    }
                  }}
                >
                  {!allDataPresent()
                    ? 'Enter Device Details'
                    : isDeviceMinted
                    ? 'Device Already Minted'
                    : buttonAction == 0
                    ? 'Store in IPFS'
                    : 'Mint Device'}
                </Button>
              </div>
            </Flex>
          </form>
          <SlideFade in={showNotification} offsetY="-20px">
            <Box position="fixed" bottom={4} right={4} width="300px">
              <Alert
                status="success"
                variant="subtle"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                boxShadow="md"
                borderRadius="md"
              >
                <AlertIcon boxSize={4} mr={2} />
                <AlertTitle mr={2} fontSize="md">
                  {status}
                </AlertTitle>
                <CloseButton size="sm" onClick={closeNotification} />
              </Alert>
            </Box>
          </SlideFade>
        </div>
      </div>
    </div>
  );
};

export default CreateDeviceModal;
