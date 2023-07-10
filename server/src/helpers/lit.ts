// import LitJsSdk from '@lit-protocol/lit-node-client';
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

import * as u8a from "uint8arrays";
import * as ethers from "ethers";
import * as siwe from "siwe";

const chain = "filecoin";
// Check if the user holds the device NFT token
const accessControlConditions = [
  {
    contractAddress: "0xb94b991e74d232596c7d174ba56b28e83825a411",
    standardContractType: "ERC721",
    chain,
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: ">",
      value: "0",
    },
  },
];

const encryptDecryptString = async (messageToEncrypt: string) => {
  // -- same thing, but without browser auth
  const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
    alertWhenUnauthorized: false,
  });
  await litNodeClient.connect();

  const authSig = await signAuthMessage();

  // 1. Encryption
  // <Blob> encryptedString
  // <Uint8Array(32)> symmetricKey
  const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
    messageToEncrypt
  );

  // 2. Saving the Encrypted Content to the Lit Nodes
  // <Unit8Array> encryptedSymmetricKey
  const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
    accessControlConditions,
    symmetricKey,
    authSig,
    chain,
  });

  // 3. Decrypt it
  // <String> toDecrypt
  const toDecrypt = LitJsSdk.uint8arrayToString(
    encryptedSymmetricKey,
    "base16"
  );

  // <Uint8Array(32)> _symmetricKey
  const _symmetricKey = await litNodeClient.getEncryptionKey({
    accessControlConditions,
    toDecrypt,
    chain,
    authSig,
  });

  // <String> decryptedString
  let decryptedString;

  try {
    decryptedString = await LitJsSdk.decryptString(
      encryptedString,
      _symmetricKey
    );
  } catch (e) {
    console.log(e);
  }

  console.warn("decryptedString:", decryptedString);
};

const decryptString = async (messageToDecrypt: string) => {};

/**
 * Get auth signature using siwe
 * @returns
 */
const signAuthMessage = async () => {
  // Replace this with you private key
  const privKey: any =
    "3dfb4f70b15b6fccc786347aaea445f439a7f10fd10c55dd50cafc3d5a0abac1";
  const privKeyBuffer: any = u8a.fromString(privKey, "base16");
  const wallet = new ethers.Wallet(privKeyBuffer);

  const domain = "fil-riot-protocol.vercel.app";
  const origin = "https://fil-riot-protocol.vercel.app";
  const statement = "We are signing in from the Riot server";

  const siweMessage = new siwe.SiweMessage({
    domain,
    address: wallet.address,
    statement,
    uri: origin,
    version: "1",
    chainId: 314,
  });

  const messageToSign = siweMessage.prepareMessage();

  const signature = await wallet.signMessage(messageToSign);

  console.log("signature", signature);

  const recoveredAddress = ethers.verifyMessage(messageToSign, signature);

  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
  };

  return authSig;
};
