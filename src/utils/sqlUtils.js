import pgFormat from "pg-format";

const buildWhereClause = (params) => {
  if (!params || params.length === 0) {
    return "";
  }

  const whereClause = params.reduce((acc, param, idx, arr) => {
    if (param.name.indexOf("_") !== -1) {
      const [column, filter] = param.name.split("_");

      if (!column || !filter) {
        throw new Error(`Parametro invalido: ${param.name}`);
      }

      const lcColumn = column.toLowerCase();
      const lcFilter = filter.toLowerCase();

      const validColumns = ["price"];
      const validFilters = { min: ">=", max: "<=" };

      if (!validColumns.includes(lcColumn)) {
        throw new Error(
          `Columna en el parametro '${
            param.name
          } debe ser una de las siguientes ${validColumns.join(", ")}`
        );
      }

      if (!validFilters.hasOwnProperty(lcFilter)) {
        throw new Error(
          `Filter en el parametro '${
            param.name
          } debe ser una de las siguientes ${Object.keys(validFilters).join(
            ", "
          )}`
        );
      }

      const filterQuery = pgFormat(
        idx === arr.length - 1 ? "%s %s %s" : "%s %s %s AND",
        lcColumn,
        validFilters[lcFilter],
        param.value
      );

      return acc + filterQuery;
    }
  }, "WHERE ");

  return whereClause;
};

export { buildWhereClause };
