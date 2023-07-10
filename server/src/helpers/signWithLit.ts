import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import * as u8a from "uint8arrays";
import * as ethers from "ethers";
import * as siwe from "siwe";
import { verifySignature } from "@pushprotocol/restapi/src/lib/chat/helpers";

const litActionCode = `
const go = async () => {
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
  const sigShare = await LitActions.signEcdsa({ toSign, publicKey, sigName });
};

go();
`;

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

  const recoveredAddress = ethers.utils.verifyMessage(messageToSign, signature);

  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
  };

  return authSig;
};

const signReadingsWithLit = async (messageToBeSigned: string) => {
  const authSig = await signAuthMessage();

  const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
    litNetwork: "serrano",
  });
  await litNodeClient.connect();

  console.log("Message to be signed: ", messageToBeSigned);

  // Message to sign must be a Uint8Array
  const message = u8a.fromString(messageToBeSigned);

  const signatures = await litNodeClient.executeJs({
    code: litActionCode,
    authSig,
    // all jsParams can be used anywhere in your litActionCode
    jsParams: {
      // this is the string "Hello World" for testing
      toSign: message,
      // PKP
      publicKey:
        "0x04feeb3faf2776e1b8777ebd0b96ba94fc142721171f2bdf83ddd07466d6dc6b288a59365d362a16b347ac6074923b2869b8777ddb4cb9acd08cc8ed9536fbedaf",
      sigName: "sig1",
    },
  });
  console.log("signatures: ", signatures);

  return signatures;
};

// function verifySignature(signature: VerifyJWTProps) {
//   // verify the JWT
//   const { verified, header, payload } = LitJsSdk.verifyJwt({ signature });

//   console.log(verified, header, payload);

//   return verified;
// }

export {
  signReadingsWithLit,
  // verifySignature,
};
