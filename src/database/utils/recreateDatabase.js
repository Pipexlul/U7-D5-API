import pg from "pg";
const { Pool } = pg;

import dbPoolConfig from "../../config/dbPoolConfig";

const recreateDb = async (pool) => {
  try {
    const config = dbPoolConfig();

    await pool.query(`DROP DATABASE IF EXISTS ${config.database}`);
    await pool.query(`CREATE DATABASE ${config.database}`);

    const dbPool = new Pool(config);
    await dbPool.query(
      `CREATE TABLE ${config.table} (id SERIAL, nombre VARCHAR(50), categoria VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);`
    );

    console.log("Database recreated");

    return dbPool;
  } catch (err) {
    console.error("Could not recreate database");
    console.error(err);
  }
};

export default recreateDb;
