import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Grid,
  GridItem,
  Input,
  SlideFade,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { convertObjectToFile, getUploadToken } from 'utils';
import { polygonABI, polygonAddress } from '../utils/constants';
// import contractCall from './metamask/lib/contract-call';
import { upload } from '@spheron/browser-upload';
import { useAccount, useContractWrite } from 'wagmi';

const CreateOrganisationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { address } = useAccount();
  const [showNotification, setShowNotification] = useState(false);
  const [actionState, setActionState] = useState(0);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [emoji, setEmoji] = useState('');
  const [description, setDescription] = useState('');
  const [storedMetadataURI, setStoredMetadataURI] = useState('');
  const [fee, setFee] = useState(0);
  const [status, setStatus] = useState('');
  const closeNotification = () => {
    setShowNotification(false);
  };
  const { isSuccess, writeAsync: registerOrganisation } = useContractWrite({
    address: polygonAddress,
    abi: polygonABI,
    functionName: 'registerOrganisation',
    args: [name, symbol, storedMetadataURI],
  });

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-500 opacity-30"></div>
      <div className="bg-black border-2 border-white rounded-lg p-6">
        <Text fontSize="5xl" fontWeight="bold" mb="20px">
          Create Organisation
        </Text>
        <form>
          <div>
            <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem colSpan={2} rowSpan={1}>
                <Text mt="20px" mb="8px">
                  Name
                </Text>
                <Input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter Organisation Name"
                  value={name}
                />
              </GridItem>
              <GridItem colSpan={2} rowSpan={1}>
                <Text mt="20px" mb="8px">
                  Symbol
                </Text>
                <Input
                  onChange={(e) => {
                    setSymbol(e.target.value);
                  }}
                  placeholder="Enter Organisation NFT Symbol"
                  value={symbol}
                />
              </GridItem>
              <GridItem colSpan={1} rowSpan={1}>
                <Text mt="20px" mb="8px">
                  Emoji
                </Text>
                <Input
                  onChange={(e) => {
                    setEmoji(e.target.value);
                  }}
                  placeholder="Enter an Emoji "
                  value={emoji}
                />
              </GridItem>
              <GridItem colSpan={5} rowSpan={1}>
                <Text mt="20px" mb="8px">
                  Description
                </Text>
                <Input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Enter the description for your Organisation"
                  value={description}
                />
              </GridItem>
            </Grid>
          </div>

          <Flex mt={5} justifyContent={'space-between'}>
            <Text fontSize={'2xl'}>
              <strong>Token Ingredients</strong>
            </Text>
            <div>
              <Button colorScheme="gray" mx={3} disabled={true}>
                Create Fee : 0 tMATIC
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                ❌ CLOSE
              </Button>
              <Button
                mx={3}
                colorScheme="teal"
                variant="outline"
                isDisabled={name == '' || symbol == '' || emoji == '' || description == ''}
                onClick={async () => {
                  if (actionState == 0) {
                    let metadataUri;

                    if (storedMetadataURI == '') {
                      setStatus('Uploading Metadata to IPFS with Spheron...');
                      setShowNotification(true);
                      let currentlyUploaded = 0;
                      const storageToken = await getUploadToken();
                      console.log('Received Storage Token');
                      console.log(storageToken);
                      const { cid } = await upload(
                        [convertObjectToFile({ name, symbol, emoji, description }, 'metadata.json')],
                        {
                          token: storageToken,
                          onChunkUploaded(uploadedSize, totalSize) {
                            currentlyUploaded += uploadedSize;
                            console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
                          },
                        },
                      );
                      metadataUri = `https://ipfs.io/ipfs/${cid}/metadata.json`;
                      console.log(metadataUri);
                    } else {
                      metadataUri = storedMetadataURI;
                    }
                    setStoredMetadataURI(metadataUri);
                    setActionState(1);
                  } else {
                    console.log(storedMetadataURI);
                    setStatus('Waiting for Confirmation...');
                    try {
                      await registerOrganisation();
                      setStatus('Successfully Created Organisation');
                      setShowNotification(true);
                      onClose();
                      setInterval(() => {
                        setStatus(`Successfully Created Organisation \n ${name}}`);
                        setShowNotification(true);
                      }, 15000);
                    } catch (e) {
                      setStatus('Transaction Failed or Cancelled');
                    }
                  }
                }}
              >
                {actionState == 0 ? 'Store data in IPFS' : 'Create organisation'}
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
  );
};

export default CreateOrganisationModal;
