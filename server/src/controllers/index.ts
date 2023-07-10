import { Router } from "express";
import home from "../home";
import Web3 from "web3";
import * as crypto from "crypto";
import pushNotification from "../helpers/push";
import db from "../utilities/polybase";
import { ulid } from "ulid";
import { signReadingsWithLit } from "../helpers/signWithLit";

// WEB3 CONFIG
import {
  zkEVMContractAddress,
  mumbaiContractAddress,
  zkEVMABI,
  mumbaiABI,
  chains,
} from "../helpers/constants";
import { verifySignature } from "@pushprotocol/restapi/src/lib/chat/helpers";

// const db = new sqlite3.Database("./utilities/database.db", (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Connected to the riot database.");
// });

const router: Router = Router();

router.use("/", home);

router.post("/generate-riot-key-for-device", async (req, res) => {
  try {
    const {
      firmwareHash,
      deviceDataHash,
      deviceGroupIdHash,
      deviceId,
      chainId,
    } = req.body[0];

    let chain: any = chains.filter((c) => c.chainId === parseInt(chainId))[0];

    const web3 = new Web3(chain.rpc);
    const contract = new web3.eth.Contract(chain.abi, chain.contract);

    let key = await contract.methods
      .generateRiotKeyForDevice(
        firmwareHash,
        deviceDataHash,
        deviceGroupIdHash,
        deviceId
      )
      .call();
    let riotKey = "0x" + key.substr(2, 32);
    res.status(200).json({
      key: riotKey,
      // key: "0x2f052ba6c8e962a69b5fc75790ecd504",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/hashify", async (req, res) => {
  try {
    const { contents } = req.body;
    // console.log("Contents: ", contents);
    const hash = crypto.createHash("sha256").update(contents).digest("hex");
    // console.log("Hash: 0x", hash);

    res.status(200).json({
      hash,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/data", async (req, res) => {
  try {
    const { sensorValue, deviceId } = req.body;
    const shouldSign = req.body.shouldSign || false;

    // Sign the data
    let data = [ulid(), deviceId, sensorValue, new Date().toISOString()];

    if (shouldSign) {
      const signedData = await signReadingsWithLit(data.join(","));
      data = [signedData, ...data];
    }

    console.log(req.body);

    // Insert the record
    const record = await db.collection("SensorData").create(data);

    res.status(200).json(record);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/data", async (req, res) => {
  try {
    // Get all records
    const records = await db.collection("SensorData").get();

    res.status(200).json(records);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("verify-sign", async (req, res) => {
  try {
    const { jwt } = req.body;

    // verify the JWT
    const verified = await verifySignature(jwt);
    res.status(200).json(verified);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/flush", async (req, res) => {
  try {
    // Delete all records
    const records: any = await db.collection("SensorData").get();

    for (let i = 0; i < records.length; i++) {
      await db.collection("SensorData").record(records[i].id).call("del");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/time-util-midnight-timmestamp", async (req, res) => {
  try {
    // Get the current timestamp
    const endTime = Date.now();

    // Get the timestamp of 12 AM (midnight) of the current day
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const startTime = currentDate.getTime();

    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);

    res.status(200).json({
      startTime,
      endTime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/push-notification", async (req, res) => {
  try {
    const { deviceId, message } = req.body;

    const apiResponse = await pushNotification(
      `Device Connected`,
      `Device: ${deviceId}: ${message}`
    );

    res.status(200).json({
      apiResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// router.post("/generate-car", async (req, res) => {
//   try {
//     const file = req.body.file;

//     const carStream = createFileEncoderStream(file)
//       .pipeThrough(new CAREncoderStream())
//       .pipeTo(Writable.toWeb(process.stdout));

//     res.send(carData);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/web3-config", async (req, res) => {
  try {
    res.status(200).json({
      zkEVMContractAddress,
      mumbaiContractAddress,
      zkEVMABI,
      mumbaiABI,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
