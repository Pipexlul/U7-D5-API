import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import envConfig from "./config/envConfig.js";
const { port } = envConfig;

import jewelRoutes from "./routes/api/jewels.js";

const main = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/jewels", jewelRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: "Esa ruta no existe!" });
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

main();
