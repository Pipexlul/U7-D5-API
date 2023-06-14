import envConfig from "./envConfig.js";
const { dbhost, dbuser, dbpassword, dbname, dbtablename } = envConfig;

export default {
  host: dbhost,
  user: dbuser,
  password: dbpassword,
  database: dbname,
  table: dbtablename,
};
