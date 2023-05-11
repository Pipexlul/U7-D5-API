import pgFormat from "pg-format";

import dbManager from "../database/manager.js";
const { query } = dbManager;

import asyncMiddleware from "../middleware/asyncMiddleware.js";

import { loadTableName } from "../utils/envUtils.js";
import { buildWhereClause } from "../utils/sqlUtils.js";

let table_name;

const tableNameLoader = () => {
  if (table_name) {
    return;
  }

  table_name = loadTableName(table_name);
};

const getJewelsFilter = async (req, res) => {
  tableNameLoader();

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

    const { limit = 10, page = 1, order_by } = req.query.base;

    const limitQuery = limit !== -1 ? pgFormat("LIMIT %s", limit) : "";
    const offsetQuery =
      limit !== -1 ? pgFormat("OFFSET %s", (page - 1) * limit) : "";
    const orderByQuery = order_by
      ? pgFormat("ORDER BY %s %s", order_by.column, order_by.order)
      : "";

    const paramArray = paramsToArray(req.query.filters);
    const whereClause = buildWhereClause(paramArray);

    const finalQuery = `SELECT * FROM ${table_name} ${whereClause} ${orderByQuery} ${offsetQuery} ${limitQuery}`;

    const result = await query(finalQuery);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default {
  getJewelsFilter: asyncMiddleware(getJewelsFilter),
};
