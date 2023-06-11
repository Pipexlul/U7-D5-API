import pg from "pg";

import dbPoolConfig from "../config/dbPoolConfig.js";
const { table } = dbPoolConfig;

const createTable = async (dbPool) => {
  try {
    await dbPool.query(
      `CREATE TABLE ${table} (id SERIAL, nombre VARCHAR(50), categoria VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);`
    );
  } catch (err) {
    throw new Error(err.message || err);
  }
};

const insertTestData = async (dbPool) => {
  await dbPool.query(
    `INSERT INTO ${config.table} values
    (DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
    (DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
    (DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
    (DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
    (DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
    (DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);`
  );
};

export default {
  tableName: table,
  createTable,
  insertTestData,
};
