import pg from "pg";
const { Pool } = pg;

import dbPoolConfig from "../config/dbPoolConfig.js";

const dbPool = new Pool(dbPoolConfig);

export default dbPool;
