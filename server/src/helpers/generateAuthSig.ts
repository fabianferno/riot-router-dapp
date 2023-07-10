import { fromString as uint8arrayFromString } from "uint8arrays/from-string";
const { ethers } = require("ethers");
import * as siwe from "siwe";

async function generateAuthSig() {
  const privKey: any =
    "3dfb4f70b15b6fccc786347aaea445f439a7f10fd10c55dd50cafc3d5a0abac1";
  const privKeyBuffer: any = uint8arrayFromString(privKey, "base16");
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
    chainId: 3141,
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

  console.log("authSig", authSig);
}

export default generateAuthSig;
