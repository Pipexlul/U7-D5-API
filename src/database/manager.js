import pg from "pg";
const { Pool } = pg;

import recreateDb from "./utils/recreateDatabase.js";
import dbPoolConfig from "../config/dbPoolConfig.js";

let dbPool;

const getManager = async () => {
  const config = dbPoolConfig();

  const args = process.argv.slice(2);

  if (
    !args.some(
      (arg) =>
        arg.toLowerCase() === "-s" || arg.toLowerCase() === "--skip-recreate"
    )
  ) {
    const rootPool = new Pool({ ...config, database: "postgres" });

    try {
      dbPool = await recreateDb(rootPool);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      rootPool.end();
    }
  } else {
    dbPool = new Pool(config);
  }
};

export default {
  query: async (sql, params) => {
    if (dbPool == null) {
      await getManager();
    }

    return await dbPool.query(sql, params);
  },
};
