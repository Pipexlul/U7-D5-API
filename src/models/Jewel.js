import pgFormat from "pg-format";

import dbPool from "../database/manager.js";

import dbPoolConfig from "../config/dbPoolConfig.js";
const { table } = dbPoolConfig;

import throwErr from "../utils/errorThrower.js";

import { buildWhereClause } from "../utils/sqlUtils.js";

const getAll = async (limit = 5, page = 1, order_by) => {
  try {
    const limitQuery = limit !== -1 ? pgFormat("LIMIT %s", limit) : "";
    const offsetQuery =
      limit !== -1 ? pgFormat("OFFSET %s", (page - 1) * limit) : "";
    const orderByQuery = order_by
      ? pgFormat("ORDER BY %s %s", order_by.column, order_by.order)
      : "";

    const finalQuery = `SELECT * FROM ${table} ${orderByQuery} ${offsetQuery} ${limitQuery};`;

    const result = await dbPool.query(finalQuery);
    return result.rows;
  } catch (err) {
    throw throwErr(err);
  }
};

const getAllFilter = async (limit = 10, page = 1, order_by, paramArray) => {
  try {
    const limitQuery = limit !== -1 ? pgFormat("LIMIT %s", limit) : "";
    const offsetQuery =
      limit !== -1 ? pgFormat("OFFSET %s", (page - 1) * limit) : "";
    const orderByQuery = order_by
      ? pgFormat("ORDER BY %s %s", order_by.column, order_by.order)
      : "";

    const whereClause = buildWhereClause(paramArray);

    const finalQuery = `SELECT * FROM ${table} ${whereClause} ${orderByQuery} ${offsetQuery} ${limitQuery};`;

    const result = await dbPool.query(finalQuery);
    return result.rows;
  } catch (err) {
    throw throwErr(err);
  }
};

const getById = async (id) => {
  try {
    const query = pgFormat(`SELECT * FROM ${table} WHERE id = %L;`, id);
    const result = await dbPool.query(query);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    throw throwErr(err);
  }
};

const modelHelpers = {
  tableName: table,
  createTable: async (dbPool) => {
    try {
      await dbPool.query(
        `CREATE TABLE ${table} (id SERIAL, nombre VARCHAR(50), categoria VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);`
      );
    } catch (err) {
      throw new Error(err.message || err);
    }
  },

  insertTestData: async (dbPool) => {
    await dbPool.query(
      `INSERT INTO ${dbPoolConfig.table} values
        (DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
        (DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
        (DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
        (DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
        (DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
        (DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);`
    );
  },
};

export default {
  getAll,
  getAllFilter,
  getById,
  modelHelpers,
};
