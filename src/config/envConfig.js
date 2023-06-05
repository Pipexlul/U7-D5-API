import * as dotenv from "dotenv";
dotenv.config();

const numPort = parseInt(process.env.TEST_PORT);

const envConfig = {
  port: isNaN(numPort) ? 3000 : numPort,
  dbhost: process.env.DB_HOST,
  dbuser: process.env.DB_USERNAME,
  dbpassword: process.env.DB_PASSWORD,
  dbname: process.env.DB_DATABASENAME,
  dbtablename: process.env.DB_MAINTABLE,
};

export default envConfig;
