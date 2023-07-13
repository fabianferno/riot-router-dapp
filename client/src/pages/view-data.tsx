import { Default } from 'components/layouts/Default';
import { Button, Flex, Box, Text, Input, Progress, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
const aesjs = require('aes-js');
import crypto from 'crypto';
import { useState, useEffect } from 'react';
import axios from 'axios';

// import contractCall from '../components/metamask/lib/contract-call';
import { deployments, generalABI, polygonABI, polygonAddress, RIOT_RPC_URL } from 'utils/constants';
import { useAccount, useContractRead, useContractWrite, useNetwork } from 'wagmi';
import Image from 'next/image';

const DatabaseTable = ({
  data,
}: {
  data: {
    id: number;
    deviceId: string;
    created_at: string;
    sensorValue: number;
  }[];
}) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Device ID</Th>
          <Th>Created At</Th>
          <Th>Sensor Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row) => (
          <Tr key={row.id}>
            <Td>{row.id}</Td>
            <Td>{row.deviceId}</Td>
            <Td>{row.created_at}</Td>
            <Td>{row.sensorValue}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const ViewDataPage = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [tokenId, setTokenId] = useState('');
  const [deviceId, setDeviceId] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain } = useNetwork();
  const { address } = useAccount();

  useEffect(() => {
    // Make a axios get call
    (async () => {
      await axios
        .get(`${RIOT_RPC_URL}/data`)
        .then((response) => {
          // console.log(response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    })();
  }, []);
  const { data: mumbaiRiotKey } = useContractRead({
    address: polygonAddress,
    abi: polygonABI,
    functionName: 'generateRiotKeyForSubscriber',
    args: [tokenId],
  });
  const { data: crossChainRiotKey } = useContractRead({
    address: deployments[parseInt(chain.id.toString())],
    abi: generalABI,
    functionName: 'getLatestRiotKey',
    args: [tokenId],
  });
  const { writeAsync: getRiotKeyCrossChain } = useContractWrite({
    address: deployments[parseInt(chain.id.toString())],
    abi: generalABI,
    functionName: 'transferCrossChain',
    args: [
      '80001',
      [tokenId, address],
      '0x00000000000186a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    ],
  });

  function getCipherFromKey(riot_key_hex: string) {
    // Convert the hex key string to bytes
    const riot_key_bytes = Buffer.from(riot_key_hex.substring(2), 'hex');
    const riotKey = riot_key_bytes.toString('hex');
    console.log('Recieved Riot Key: ', riotKey);
    // Create Ciphers
    const cipher = crypto.createCipheriv('aes-128-ecb', riotKey, '');
    return cipher;
  }

  function decryptWithCipher(cipher: any, encrypted_sensor_value: string) {
    // Decrypt the encrypted sensor value
    let decrypted_sensor_value = cipher.decrypt(encrypted_sensor_value);
    // Remove the padding from the decrypted sensor value
    decrypted_sensor_value = decrypted_sensor_value.replace(/\0/g, '');
    // Convert the decrypted sensor value to string
    decrypted_sensor_value = decrypted_sensor_value.toString('utf-8');
    return decrypted_sensor_value;
  }
  useEffect(() => {
    console.log(crossChainRiotKey);
  }, []);

  async function DecryptData() {
    setLoading(true);
    console.log('Device ID: ', deviceId);
    if (chain.id != 80001) {
    } else {
    }

    let riotKeyHex: any = mumbaiRiotKey;
    console.log('generateRiotKeyForSubscriber: ', riotKeyHex);
    const riotKeyBytes = Buffer.from(riotKeyHex.slice(2), 'hex');
    const subscriberRiotKey = riotKeyBytes.toString('hex');
    console.log('Riot Key Hex: ', riotKeyHex);
    console.log('Riot Key Bytes: ', riotKeyBytes);
    console.log('Subscriber Riot Key: ', subscriberRiotKey);

    setRiotKey(subscriberRiotKey);
    setLoading(false);

    const decrypted_data = data.map((item: any) => {
      const encryptedBuffer = Buffer.from(item.sensorValue, 'hex');
      console.log('Encrypted Buffer', encryptedBuffer);
      // Create AES ECB cipher
      const aesEcb = new aesjs.ModeOfOperation.ecb(riotKeyBytes);

      // Perform decryption
      const decryptedBytes = aesEcb.decrypt(encryptedBuffer);
      const decryptedText = decryptedBytes.toString('utf-8').replace(/\0+$/, ''); // Remove null padding
      // Unhexlify decrypted text
      const unhexlifiedText = Buffer.from(decryptedText, 'hex');
      console.log(decryptedText, decryptedBytes);

      item.sensorValue = unhexlifiedText;
      return item;
    });
    setData(decrypted_data);
    console.log(decrypted_data);
  }

  return (
    <div className="mx-24">
      <Button size={'lg'} className="underline" onClick={onOpen}>
        Open extended view
      </Button>

      <Modal size={'5xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {chain?.id != 80001 && (
              <div className="flex justify-center">
                <p className="my-auto font-semibold text-xl">Powered by &nbsp;&nbsp;</p>
                <Image className="rounded-lg" src="/router.png" width={100} height={100} alt={'Router Protocol'} />
              </div>
            )}
            <div>
              <Text mt="20px" mb="8px">
                Device ID
              </Text>
              <Flex>
                <Input
                  onChange={(e) => {
                    setDeviceId(e.target.value);
                  }}
                  value={deviceId}
                  placeholder="Enter the device address"
                />
              </Flex>
            </div>
            <div>
              <Text mt="20px" mb="8px">
                Token Id
              </Text>
              <Flex>
                <Input
                  onChange={(e) => {
                    setTokenId(e.target.value);
                  }}
                  value={tokenId}
                  placeholder="Enter the token Id of your device"
                />
              </Flex>
            </div>
            <Button my={'4'} colorScheme="teal" size="md" onClick={DecryptData}>
              Decrypt Device
            </Button>
            <Text mt="20px" mb="8px" fontSize={'lg'} fontWeight={'semibold'}>
              {chain.id == 80001 ? 'Obtained Riot Key' : 'Riot Key in ' + chain?.name}
            </Text>
            <Text mt="20px" mb="8px" fontWeight={'bold'} fontSize={'2xl'}>
              {JSON.stringify(
                chain.id == 80001
                  ? mumbaiRiotKey == '0x0000000000000000000000000000000000000000000000000000000000000000' ||
                    mumbaiRiotKey == undefined
                    ? 'Fetching...'
                    : mumbaiRiotKey == '0x0000000000000000000000000000000000000000000000000000000000000001'
                    ? "You don't own the device"
                    : mumbaiRiotKey
                  : crossChainRiotKey == '0x0000000000000000000000000000000000000000000000000000000000000000' ||
                    crossChainRiotKey == undefined
                  ? 'Fetching...'
                  : crossChainRiotKey == '0x0000000000000000000000000000000000000000000000000000000000000001'
                  ? "You don't own the device"
                  : crossChainRiotKey,
              )}
            </Text>
            <Box mt={5} mb={3}>
              <hr />
            </Box>

            {loading ? <Progress size="xs" isIndeterminate /> : <DatabaseTable data={data} />}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ViewDataPage;
