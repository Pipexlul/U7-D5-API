import dbPoolConfig from "../config/dbPoolConfig.js";

const loadTableName = (tableVar) => {
  if (tableVar == null) {
    const config = dbPoolConfig();
    return config.table;
  } else {
    return tableVar;
  }
};

export { loadTableName };
