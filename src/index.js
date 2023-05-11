import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import jewelQueries from "./middleware/query/jewelsQueries.js";

import jewelRoutes from "./routes/jewels.js";
import jewelsFilterRoutes from "./routes/jewels_filter.js";

import routeValidators from "./middleware/validators/routes.js";

const main = () => {
  const portNum = parseInt(process.env.TEST_PORT);
  const DEFAULT_PORT = portNum || 3000;
  process.env.TEST_PORT = DEFAULT_PORT;

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/jewels", jewelQueries, jewelRoutes.getJewels);
  app.get("/jewels/filter", jewelQueries, jewelsFilterRoutes.getJewelsFilter);
  app.get(
    "/jewels/:id",
    jewelQueries,
    routeValidators.getJewel,
    jewelRoutes.getJewel
  );

  app.get("*", (req, res) => {
    res.status(404).json({ error: "Esa ruta no existe!" });
  });

  app.listen(DEFAULT_PORT, () => {
    console.log(`Server running on port ${DEFAULT_PORT}`);
  });
};

main();
