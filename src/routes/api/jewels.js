import pgFormat from "pg-format";

import dbManager from "../../database/manager.js";
const { query } = dbManager;

import asyncMiddleware from "../../middleware/asyncMiddleware.js";

import { transformResponse } from "../../utils/HATEOAS.js";

const getJewels = async (req, res) => {
  try {
    const { limit = 5, page = 1, order_by } = req.query.base;

    const limitQuery = limit !== -1 ? pgFormat("LIMIT %s", limit) : "";
    const offsetQuery =
      limit !== -1 ? pgFormat("OFFSET %s", (page - 1) * limit) : "";
    const orderByQuery = order_by
      ? pgFormat("ORDER BY %s %s", order_by.column, order_by.order)
      : "";

    const finalQuery = `SELECT * FROM ${table_name} ${orderByQuery} ${offsetQuery} ${limitQuery}`;

    const result = await query(finalQuery);

    const HATEOASResponse = transformResponse(
      undefined,
      process.env.TEST_PORT,
      "jewels",
      result.rows
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

    const result = await query(`SELECT * FROM ${table_name} WHERE id = $1;`, [
      id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: `No existe la joya con id: ${id}` });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default {
  getJewels: asyncMiddleware(getJewels),
  getJewel: asyncMiddleware(getJewel),
};
