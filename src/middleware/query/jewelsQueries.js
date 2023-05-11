const jewelQueries = (req, res, next) => {
  const { limit, page, order_by, precio_max, precio_min, categoria, metal } =
    req.query;

  const formatted = {};

  if (limit) {
    const limitNum = parseInt(limit);
    if (isNaN(limitNum)) {
      res.status(400).json({ error: "limit query debe ser un número entero" });
      return;
    }

    formatted.limit = limitNum;
  }

  if (page) {
    const pageNum = parseInt(page);
    if (isNaN(pageNum)) {
      res.status(400).json({ error: "page query debe ser un número entero" });
      return;
    }

    formatted.page = pageNum;
  }

  if (order_by) {
    const [column, order] = order_by.split("_");
    if (!column || !order) {
      res.status(400).json({
        error: "order_by query debe tener una columna y una dirección",
      });
      return;
    }

    const validColumns = ["nombre", "categoria", "metal", "precio", "stock"];
    const validOrders = ["ASC", "DESC"];
    if (!validColumns.includes(column.toLowerCase())) {
      res.status(400).json({
        error: `Columna en order_by query debe ser una de las siguientes ${validColumns.join(
          ", "
        )}`,
      });
      return;
    }

    if (!validOrders.includes(order.toUpperCase())) {
      res
        .status(400)
        .json({ error: "Dirección en order_by query debe ser ASC o DESC" });
      return;
    }

    formatted.order_by = { column, order };
  }

  if (precio_max) {
    const precio_maxNum = parseInt(precio_max);
    if (isNaN(precio_maxNum)) {
      res
        .status(400)
        .json({ error: "precio_max query debe ser un número entero" });
      return;
    }

    formatted.precio_max = precio_maxNum;
  }

  if (precio_min) {
    const precio_minNum = parseInt(precio_min);
    if (isNaN(precio_minNum)) {
      res
        .status(400)
        .json({ error: "precio_min query debe ser un número entero" });
      return;
    }

    formatted.precio_min = precio_minNum;
  }

  if (categoria) {
    formatted.categoria = categoria.toLowerCase();
  }

  if (metal) {
    formatted.metal = metal.toLowerCase();
  }

  req.query = formatted;

  next();
};

export default jewelQueries;
