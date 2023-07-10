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
import { clientAddress, protocolABI, protocolAddress } from './metamask/lib/constants';
import contractCall from './metamask/lib/contract-call';
import { upload } from '@spheron/browser-upload';

const CreateOrganisationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { currentAccount } = useSelector((state: any) => state.metamask);
  const [showNotification, setShowNotification] = useState(false);
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

  useEffect(() => {
    (async function () {
      let responseFee = await contractCall(protocolAddress, currentAccount, protocolABI, [], 0, 'getCreateFee()', true);
      setFee(parseInt(responseFee.toString()));
    });
  }, []);

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
                Create Fee : {fee} tFIL
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
                    setStoredMetadataURI(metadataUri);
                  } else {
                    metadataUri = storedMetadataURI;
                  }

                  // let metadataUri = 'https://ipfs.io/ipfs/bafybeiflby3whlpmbxuvmobp7fqsrhrbhylpn2cxgvk3lfn4vsib5b3moq/';
                  setStatus('Waiting for Confirmation...');

                  let response = await contractCall(
                    protocolAddress,
                    currentAccount,
                    protocolABI,
                    [name, symbol, metadataUri, clientAddress],
                    0,
                    'registerOrganisation(string,string,string,address)',
                    false,
                  );
                  if (response == 'Execution Complete') {
                    setStatus('Processing Transaction...');
                    setShowNotification(true);
                    onClose();
                    setInterval(() => {
                      setStatus(`Successfully Created Organisation \n ${name}}`);
                      setShowNotification(true);
                    }, 15000);
                  } else {
                    setStatus('Transaction Failed or Cancelled');
                  }
                }}
              >
                Create organisation
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
