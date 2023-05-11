import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const main = () => {
  const portNum = parseInt(process.env.DEFAULT_PORT);
  const DEFAULT_PORT = portNum || 3000;

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.listen(DEFAULT_PORT, () => {
    console.log(`Server running on port ${DEFAULT_PORT}`);
  });
};

main();
