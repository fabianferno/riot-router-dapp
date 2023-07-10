const organisationABI: any = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "_dealClientAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "DeviceCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "deviceId",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "firmwareHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceDataHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceGroupIdHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "sessionSalt",
            type: "bytes32",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct RiotOrganisation.CreateDeviceParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createDevice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "dealClient",
    outputs: [
      {
        internalType: "contract IDealClient",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "deviceIdToDevice",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "deviceId",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "firmwareHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "deviceDataHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "deviceGroupIdHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "subscriber",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "sessionSalt",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_firmwareHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_deviceDataHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_deviceGroupIdHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
    ],
    name: "generateRiotKeyForDevice",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
    ],
    name: "generateRiotKeyForSubscriber",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
    ],
    name: "getDevice",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "deviceId",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "firmwareHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceDataHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceGroupIdHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "subscriber",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "sessionSalt",
            type: "bytes32",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct RiotOrganisation.Device",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDevices",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "deviceId",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "firmwareHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceDataHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "deviceGroupIdHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "subscriber",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "sessionSalt",
            type: "bytes32",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct RiotOrganisation.Device[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDevicesCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "hashes",
        type: "bytes32[]",
      },
    ],
    name: "getMerkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
    ],
    name: "isDeviceMinted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dealClient",
        type: "address",
      },
    ],
    name: "setDealClient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
      {
        internalType: "address",
        name: "_subscriber",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "newSessionSalt",
        type: "bytes32",
      },
    ],
    name: "setSubscriberAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "piece_cid",
            type: "bytes",
          },
          {
            internalType: "uint64",
            name: "piece_size",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "verified_deal",
            type: "bool",
          },
          {
            internalType: "string",
            name: "label",
            type: "string",
          },
          {
            internalType: "int64",
            name: "start_epoch",
            type: "int64",
          },
          {
            internalType: "int64",
            name: "end_epoch",
            type: "int64",
          },
          {
            internalType: "uint256",
            name: "storage_price_per_epoch",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "provider_collateral",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "client_collateral",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "extra_params_version",
            type: "uint64",
          },
          {
            components: [
              {
                internalType: "string",
                name: "location_ref",
                type: "string",
              },
              {
                internalType: "uint64",
                name: "car_size",
                type: "uint64",
              },
              {
                internalType: "bool",
                name: "skip_ipni_announce",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "remove_unsealed_copy",
                type: "bool",
              },
            ],
            internalType: "struct IDealClient.ExtraParamsV1",
            name: "extra_params",
            type: "tuple",
          },
        ],
        internalType: "struct IDealClient.DealRequest",
        name: "deal",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "sessionSalt",
        type: "bytes32",
      },
    ],
    name: "storeDeviceData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_firmwareHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_deviceId",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "sessionSalt",
        type: "bytes32",
      },
    ],
    name: "updateFirmware",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

import Web3 from "web3";

const organisationContract = "0x5055c36aca8f8137571709812d1c6f434cf4bbe6";

const web3 = new Web3("https://filecoin-calibration.chainup.net/rpc/v1");
const contract = new web3.eth.Contract(organisationABI, organisationContract);

const extraParamsV1 = [
  "https://ipfs.io/ipfs/bafybeib3prwkttfnabmnl6lawh4rzc6env7a4rygp73myqokztdgteesqy/eb51e149-7179-4129-b619-4d97d740daa3.car", // carLink (Generated in previous step)
  2384, // carSize (Generated in previous step).
  false, // skipIpniAnnounce (whether or not the deal should be announced to IPNI indexers, set to false)
  false, // removeUnsealedCopy (whether or not the storage provider should remove an unsealed copy. Set to false)
];

export const dataDump = async () => {
  let key = await contract.methods
    .storeDeviceData(
      "baga6ea4seaqmwv56zklsczavrejltsqxtpgkglszklldh2i7hnrwn22ds7xskni", // pieceCID (Generated in previous step)
      4096, // pieceSize (Generated in previous step)
      false, // verifiedDeal (whether the deal has datacap or not)
      "bafybeid5ysbb5k7gnzetechlfjasgnpq6wwrxnfh2mdmv2fggeijodss7y", // DataCID (generated in previous step)
      520000, // startEpoch (when you want the storage to start)
      1555200, // endEpoch (when you want the storage to end)
      0, // storagePricePerEpoch (how much attoFIL per GiB per 30s you are offering for this deal, set to 0 for a free deal)
      0, // providerCollateral (how much collateral the provider must put up for the deal)
      0, // clientCollateral (how much collateral you, the client, must put up for the deal)
      1, // extraParamsVersion (set to 1)
      extraParamsV1 // see below
    )
    .call();
};
