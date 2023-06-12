import pg from "pg";
const { Pool } = pg;

import JewelModel from "../models/Jewel.js";

import dbPoolConfig from "../config/dbPoolConfig.js";

import { hasOptions } from "../utils/cmdArgs.js";

const forceRecreate = hasOptions("-f", "--force-recreate");

const main = async () => {
  const models = [JewelModel];

  const dbPool = new Pool({
    ...dbPoolConfig,
    database: "postgres",
  });

  const createDatabase = async () => {
    try {
      await dbPool.query(`DROP DATABASE IF EXISTS ${dbPoolConfig.database};`);
      await dbPool.query(`CREATE DATABASE ${dbPoolConfig.database};`);
    } catch (err) {
      console.error("Error during database creation");
      console.error(err);
      process.exit(1);
    }
  };

  const createTables = async () => {
    for (const model of models) {
      const {
        modelHelpers: { createTable, insertTestData, tableName },
      } = model;

      try {
        await createTable(dbPool);

        if (insertTestData) {
          await insertTestData(dbPool);
        }
      } catch (err) {
        console.error(`Error during table creation: ${tableName}`);
        console.error(err);
        process.exit(1);
      }
    }
  };

  try {
    const dbExistsResult = await dbPool.query(
      `SELECT EXISTS (SELECT FROM pg_database WHERE datname = '${dbPoolConfig.database};')`
    );

    const dbExists = dbExistsResult.rows.length > 0;
    if (dbExists && !forceRecreate) {
      console.log("Database already exists. Skipping creation.");
      process.exit(0);
    }

    await createDatabase();
    await createTables();

    console.log("Database and tables created!");
  } catch (err) {
    console.error("Error in main function of database handler script.");
    console.error(err);
    process.exit(1);
  }
};

main();
