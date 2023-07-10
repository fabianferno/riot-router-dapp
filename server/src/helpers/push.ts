import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";

async function pushNotification(title: string, body: string, image?: string) {
  const Pkey = `0x248218dfcc0992e32a8b9589f9f8e81eb285c6326cce84347ca3bfd6a3c03a50`;
  const _signer = new ethers.Wallet(Pkey);

  const apiResponse = await PushAPI.payloads.sendNotification({
    signer: _signer,
    type: 1, // broadcast
    identityType: 2, // direct payload
    notification: {
      title: title,
      body: body,
    },
    payload: {
      title: title,
      body: body,
      cta: "",
      img: image || "https://i.ibb.co/CVGx0Lj/Screenshot-2023-06-04-012340.png",
    },
    channel: "eip155:5:0x64574dDbe98813b23364704e0B00E2e71fC5aD17", // your channel address
    env: "staging",
  } as any);

  return apiResponse.data;
}

export default pushNotification;
