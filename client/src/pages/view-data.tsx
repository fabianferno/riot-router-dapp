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

import contractCall from '../components/metamask/lib/contract-call';
import { RIOT_RPC_URL } from 'components/metamask/lib/constants';
import { useSelector } from 'react-redux';

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
  const [riotKey, setRiotKey] = useState('');
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const [deviceId, setDeviceId] = useState('');

  const { currentAccount } = useSelector((state: any) => state.metamask);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  async function DecryptData() {
    setLoading(true);
    console.log('Device ID: ', deviceId);

    // const riotKeyHex = await contractCall(
    //   zkEVMContractAddress,
    //   currentAccount,
    //   zkEVMABI,
    //   [deviceId],
    //   0,
    //   'generateRiotKeyForSubscriber(address)',
    //   true,
    // );
    // // console.log('generateRiotKeyForSubscriber: ', riotKeyHex);
    // // const riotKeyBytes = Buffer.from(riotKeyHex.slice(2), 'hex');
    // // const subscriberRiotKey = riotKeyBytes.toString('hex');
    // // console.log('Riot Key Hex: ', riotKeyHex);
    // // console.log('Riot Key Bytes: ', riotKeyBytes);
    // // console.log('Subscriber Riot Key: ', subscriberRiotKey);

    // // setRiotKey(subscriberRiotKey);
    // // setLoading(false);

    // // const decrypted_data = data.map((item: any) => {
    // //   const encryptedBuffer = Buffer.from(item.sensorValue, 'hex');
    // //   console.log('Encrypted Buffer', encryptedBuffer);
    // //   // Create AES ECB cipher
    // //   const aesEcb = new aesjs.ModeOfOperation.ecb(riotKeyBytes);

    // //   // Perform decryption
    // //   const decryptedBytes = aesEcb.decrypt(encryptedBuffer);
    // //   const decryptedText = decryptedBytes.toString('utf-8').replace(/\0+$/, ''); // Remove null padding
    // //   // Unhexlify decrypted text
    // //   const unhexlifiedText = Buffer.from(decryptedText, 'hex');
    // //   console.log(decryptedText, decryptedBytes);

    // //   item.sensorValue = unhexlifiedText;
    // //   return item;
    // // });
    // setData(decrypted_data);
    // console.log(decrypted_data);
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
            <div>
              <Text mt="20px" mb="8px">
                Device ID
              </Text>
              <Flex>
                <Input
                  onChange={(e) => {
                    setDeviceId(e.target.value);
                  }}
                  placeholder="Enter the device address"
                />
                <Button colorScheme="teal" size="md" onClick={DecryptData}>
                  Decrypt Device
                </Button>
              </Flex>
            </div>

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
