import express from "express";
import JewelController from "../../controllers/Jewel.controller.js";

import jewelQueries from "../../middleware/query/jewelsQueries.js";
import routeValidators from "../../middleware/validators/routes.js";

const router = express.Router();

router.get("/", jewelQueries, JewelController.getJewels);
router.get("/filter", jewelQueries, JewelController.getJewelsFilter);
router.get("/:id", routeValidators.getJewel, JewelController.getJewel);

export default router;
