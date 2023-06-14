import asyncMiddleware from "../middleware/asyncMiddleware.js";

import Jewel from "../models/Jewel.js";

import envConfig from "../config/envConfig.js";
const { port } = envConfig;

import { transformResponse } from "../utils/HATEOAS.js";

const getJewels = async (req, res) => {
  try {
    const { limit, page, order_by } = req.query.base;

    const result = await Jewel.getAll(limit, page, order_by);

    const HATEOASResponse = transformResponse(
      undefined,
      port,
      "jewels",
      result
    );

    res.status(200).json(HATEOASResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getJewel = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Jewel.getById(id);

    if (result === null) {
      res.status(404).json({ error: `No existe la joya con id: ${id}` });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getJewelsFilter = async (req, res) => {
  try {
    const paramsToArray = (filterParams) => {
      const entries = Object.entries(filterParams);

      const result = [];
      entries.forEach(([key, value]) => {
        if (value) {
          result.push({ name: key, value: value });
        }
      });

      return result;
    };

    const { limit, page, order_by } = req.query.base;
    const paramsArray = paramsToArray(req.query.filters);

    const result = await Jewel.getAllFilter(limit, page, order_by, paramsArray);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default {
  getJewels: asyncMiddleware(getJewels),
  getJewelsFilter: asyncMiddleware(getJewelsFilter),
  getJewel: asyncMiddleware(getJewel),
};
