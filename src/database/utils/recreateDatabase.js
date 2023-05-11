import pg from "pg";
const { Pool } = pg;

import dbPoolConfig from "../../config/dbPoolConfig.js";

const recreateDb = async (pool) => {
  try {
    const config = dbPoolConfig();

    await pool.query(`DROP DATABASE IF EXISTS ${config.database}`);
    await pool.query(`CREATE DATABASE ${config.database}`);

    const dbPool = new Pool(config);
    await dbPool.query(
      `CREATE TABLE ${config.table} (id SERIAL, nombre VARCHAR(50), categoria VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);`
    );

    await dbPool.query(
      `INSERT INTO ${config.table} values
      (DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
      (DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
      (DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
      (DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
      (DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
      (DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);`
    );

    console.log("Database recreated");

    return dbPool;
  } catch (err) {
    console.error("Could not recreate database");
    console.error(err);
  }
};

export default recreateDb;
