import pgFormat from "pg-format";

import dbManager from "../database/manager.js";
const { query } = dbManager;

import dbPoolConfig from "../config/dbPoolConfig.js";

import asyncMiddleware from "../middleware/asyncMiddleware.js";

let table_name;

const loadTableName = () => {
  if (table_name == null) {
    const config = dbPoolConfig();
    table_name = config.table;
  }
};

const getJewels = async (req, res) => {
  loadTableName();

  try {
    const { limit = 5, page = 1, order_by } = req.query;

    const limitQuery = limit !== -1 ? pgFormat("LIMIT %s", limit) : "";
    const offsetQuery = pgFormat("OFFSET %s", (page - 1) * limit);
    const orderByQuery = order_by
      ? pgFormat("ORDER BY %s %s", order_by.column, order_by.order)
      : "";

    const finalQuery = `SELECT * FROM ${table_name} ${orderByQuery} ${offsetQuery} ${limitQuery}`;

    const result = await query(finalQuery);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export default {
  getJewels: asyncMiddleware(getJewels),
};
