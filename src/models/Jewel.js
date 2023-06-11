import pg from "pg";
import pgFormat from "pg-format";

import dbPoolConfig from "../config/dbPoolConfig.js";
const { table } = dbPoolConfig;

const getAll = async (poolQuery) => {
  try {
    const result = await poolQuery(`SELECT * FROM ${table};`);
    return result.rows;
  } catch (err) {
    throw new Error(err.message || err);
  }
};

const getById = async (poolQuery, id) => {
  try {
    const query = pgFormat(`SELECT * FROM ${table} WHERE id = %L;`, id);
    const result = await poolQuery(query);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    throw new Error(err.message || err);
  }
};

const modelHelpers = {
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
      `INSERT INTO ${config.table} values
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
  getById,
  modelHelpers,
};
