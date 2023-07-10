const RIOT_RPC_URL = process.env.RIOT_RPC_URL || 'https://riot-rpc-server.adaptable.app';
const riotDeviceImages = [
  // 'https://bafkreidmkpibpkguvrnzuqgmudacxji4fl6g437wrtb74t5uliqihuhede.ipfs.nftstorage.link/',
  // 'https://bafkreibufkhlr6kaq4mhb4tpczbwtzm7jx2q7nrnwed2ndk6klrv6da54u.ipfs.nftstorage.link/',
  'https://bafybeice6wite46sx5ztubkuafmxhjmacq6iivhlvl23fokf6ql3mqwc44.ipfs.nftstorage.link/',
];
const protocolAddress = '0x0AE7d655Cda406c5b73Ea76855e2cE6aC3812a8E';
const protocolABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_createFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'organisationContractAddress',
        type: 'address',
      },
    ],
    name: 'OrganisationCreated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getCreateFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_organisationAddress',
        type: 'address',
      },
    ],
    name: 'getOrganisation',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'organisationContractAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'metadata',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
        ],
        internalType: 'struct TheRiotProtocol.Organisation',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOrganisations',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'organisationContractAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'metadata',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
        ],
        internalType: 'struct TheRiotProtocol.Organisation[]',
        name: '_organisations',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'isRiotOrganisation',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_metadata',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_dealClientAddress',
        type: 'address',
      },
    ],
    name: 'registerOrganisation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    name: 'setCreateFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const clientAddress = '0x1f895309544911B2cF852Eb1cC1dddcB6E6CC248';
const clientABI = [
  {
    inputs: [
      {
        internalType: 'contract ITheRiotProtocol',
        name: '_riotProtocol',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'errorCode',
        type: 'int256',
      },
    ],
    name: 'ActorError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ActorNotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailToCallActor',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAddress',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    name: 'InvalidCodec',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidResponseLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NegativeValueNotAllowed',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'NotEnoughBalance',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'size',
        type: 'uint64',
      },
      {
        indexed: true,
        internalType: 'bool',
        name: 'verified',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'DealProposalCreate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'received',
        type: 'string',
      },
    ],
    name: 'ReceivedDataCap',
    type: 'event',
  },
  {
    inputs: [],
    name: 'AUTHENTICATE_MESSAGE_METHOD_NUM',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DATACAP_ACTOR_ETH_ADDRESS',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DATACAP_RECEIVER_HOOK_METHOD_NUM',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MARKET_ACTOR_ETH_ADDRESS',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MARKET_NOTIFY_DEAL_METHOD_NUM',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'addBalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'dealRequestIdx',
    outputs: [
      {
        internalType: 'uint256',
        name: 'idx',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'valid',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'dealRequests',
    outputs: [
      {
        internalType: 'bytes',
        name: 'piece_cid',
        type: 'bytes',
      },
      {
        internalType: 'uint64',
        name: 'piece_size',
        type: 'uint64',
      },
      {
        internalType: 'bool',
        name: 'verified_deal',
        type: 'bool',
      },
      {
        internalType: 'string',
        name: 'label',
        type: 'string',
      },
      {
        internalType: 'int64',
        name: 'start_epoch',
        type: 'int64',
      },
      {
        internalType: 'int64',
        name: 'end_epoch',
        type: 'int64',
      },
      {
        internalType: 'uint256',
        name: 'storage_price_per_epoch',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'provider_collateral',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'client_collateral',
        type: 'uint256',
      },
      {
        internalType: 'uint64',
        name: 'extra_params_version',
        type: 'uint64',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'location_ref',
            type: 'string',
          },
          {
            internalType: 'uint64',
            name: 'car_size',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'skip_ipni_announce',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'remove_unsealed_copy',
            type: 'bool',
          },
        ],
        internalType: 'struct ExtraParamsV1',
        name: 'extra_params',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dealsLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getDealByIndex',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'piece_cid',
            type: 'bytes',
          },
          {
            internalType: 'uint64',
            name: 'piece_size',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'verified_deal',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'label',
            type: 'string',
          },
          {
            internalType: 'int64',
            name: 'start_epoch',
            type: 'int64',
          },
          {
            internalType: 'int64',
            name: 'end_epoch',
            type: 'int64',
          },
          {
            internalType: 'uint256',
            name: 'storage_price_per_epoch',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'provider_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'client_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'extra_params_version',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'location_ref',
                type: 'string',
              },
              {
                internalType: 'uint64',
                name: 'car_size',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'skip_ipni_announce',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'remove_unsealed_copy',
                type: 'bool',
              },
            ],
            internalType: 'struct ExtraParamsV1',
            name: 'extra_params',
            type: 'tuple',
          },
        ],
        internalType: 'struct DealRequest',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'proposalId',
        type: 'bytes32',
      },
    ],
    name: 'getDealProposal',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'proposalId',
        type: 'bytes32',
      },
    ],
    name: 'getExtraParams',
    outputs: [
      {
        internalType: 'bytes',
        name: 'extra_params',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'cid',
        type: 'bytes',
      },
    ],
    name: 'getProposalIdSet',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'requestId',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'valid',
            type: 'bool',
          },
        ],
        internalType: 'struct RequestId',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'cid',
        type: 'bytes',
      },
    ],
    name: 'getProviderSet',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'provider',
            type: 'bytes',
          },
          {
            internalType: 'bool',
            name: 'valid',
            type: 'bool',
          },
        ],
        internalType: 'struct ProviderSet',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'method',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'handle_filecoin_method',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'piece_cid',
            type: 'bytes',
          },
          {
            internalType: 'uint64',
            name: 'piece_size',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'verified_deal',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'label',
            type: 'string',
          },
          {
            internalType: 'int64',
            name: 'start_epoch',
            type: 'int64',
          },
          {
            internalType: 'int64',
            name: 'end_epoch',
            type: 'int64',
          },
          {
            internalType: 'uint256',
            name: 'storage_price_per_epoch',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'provider_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'client_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'extra_params_version',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'location_ref',
                type: 'string',
              },
              {
                internalType: 'uint64',
                name: 'car_size',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'skip_ipni_announce',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'remove_unsealed_copy',
                type: 'bool',
              },
            ],
            internalType: 'struct ExtraParamsV1',
            name: 'extra_params',
            type: 'tuple',
          },
        ],
        internalType: 'struct DealRequest',
        name: 'deal',
        type: 'tuple',
      },
    ],
    name: 'makeDealProposal',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'pieceDeals',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'pieceProviders',
    outputs: [
      {
        internalType: 'bytes',
        name: 'provider',
        type: 'bytes',
      },
      {
        internalType: 'bool',
        name: 'valid',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'pieceRequests',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'requestId',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: 'valid',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'pieceStatus',
    outputs: [
      {
        internalType: 'enum DealClient.Status',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'riotProtocol',
    outputs: [
      {
        internalType: 'contract ITheRiotProtocol',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'pieceCid',
        type: 'bytes',
      },
    ],
    name: 'updateActivationStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'client',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'withdrawBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const organisationABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'symbol_',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_dealClientAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'DeviceCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'deviceId',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'firmwareHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceDataHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceGroupIdHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'sessionSalt',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'uri',
            type: 'string',
          },
        ],
        internalType: 'struct RiotOrganisation.CreateDeviceParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'createDevice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dealClient',
    outputs: [
      {
        internalType: 'contract IDealClient',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'deviceIdToDevice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'deviceId',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'firmwareHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'deviceDataHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'deviceGroupIdHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'subscriber',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'sessionSalt',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: 'exists',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_firmwareHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_deviceDataHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_deviceGroupIdHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
    ],
    name: 'generateRiotKeyForDevice',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
    ],
    name: 'generateRiotKeyForSubscriber',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
    ],
    name: 'getDevice',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'deviceId',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'firmwareHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceDataHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceGroupIdHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'subscriber',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'sessionSalt',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
        ],
        internalType: 'struct RiotOrganisation.Device',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDevices',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'deviceId',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'firmwareHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceDataHash',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'deviceGroupIdHash',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'subscriber',
            type: 'address',
          },
          {
            internalType: 'bytes32',
            name: 'sessionSalt',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
        ],
        internalType: 'struct RiotOrganisation.Device[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDevicesCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'hashes',
        type: 'bytes32[]',
      },
    ],
    name: 'getMerkleRoot',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
    ],
    name: 'isDeviceMinted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_dealClient',
        type: 'address',
      },
    ],
    name: 'setDealClient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_subscriber',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'newSessionSalt',
        type: 'bytes32',
      },
    ],
    name: 'setSubscriberAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'piece_cid',
            type: 'bytes',
          },
          {
            internalType: 'uint64',
            name: 'piece_size',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'verified_deal',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'label',
            type: 'string',
          },
          {
            internalType: 'int64',
            name: 'start_epoch',
            type: 'int64',
          },
          {
            internalType: 'int64',
            name: 'end_epoch',
            type: 'int64',
          },
          {
            internalType: 'uint256',
            name: 'storage_price_per_epoch',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'provider_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'client_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'extra_params_version',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'location_ref',
                type: 'string',
              },
              {
                internalType: 'uint64',
                name: 'car_size',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'skip_ipni_announce',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'remove_unsealed_copy',
                type: 'bool',
              },
            ],
            internalType: 'struct IDealClient.ExtraParamsV1',
            name: 'extra_params',
            type: 'tuple',
          },
        ],
        internalType: 'struct IDealClient.DealRequest',
        name: 'deal',
        type: 'tuple',
      },
      {
        internalType: 'bytes32',
        name: 'sessionSalt',
        type: 'bytes32',
      },
    ],
    name: 'storeDeviceData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_firmwareHash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '_deviceId',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'sessionSalt',
        type: 'bytes32',
      },
    ],
    name: 'updateFirmware',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const chains = [
  {
    name: 'Calibration Testnet',
    chainId: 314159,
    coinName: 'tFIL',
    icon: '/filecoin.png',
    rpc: 'https://api.calibration.node.glif.io/rpc/v1',
    isMainnet: false,
    blockExplorer: 'https://fvm.starboard.ventures/calibration/explorer/',
  },
  {
    name: 'Mumbai Testnet',
    chainId: 80001,
    coinName: 'tMATIC',
    icon: '/polygon.png',
    rpc: 'https://matic-mumbai.chainstacklabs.com',
    isMainnet: false,
    blockExplorer: 'https://mumbai.polygonscan.com/',
  },
];
export {
  riotDeviceImages,
  protocolAddress,
  protocolABI,
  clientAddress,
  clientABI,
  organisationABI,
  chains,
  RIOT_RPC_URL,
};
