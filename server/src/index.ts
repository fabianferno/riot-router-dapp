import * as dotenv from "dotenv";
import { dataDump } from "./helpers/dataDump";
const cron = require("node-cron");

dotenv.config();

import server from "./api";

cron.schedule("0 0 * * *", function () {
  // Run every day at midnight
  dataDump();
});

server.listen(parseInt(process.env.PORT || "5000"), "0.0.0.0", () => {
  // Initialize the LIT SDK

  console.log(
    `The API server has successfully started. \nListening at http://localhost:${
      process.env.PORT || "5000"
    }`
  );
});

process.on("SIGINT", function () {
  process.exit(0);
});
