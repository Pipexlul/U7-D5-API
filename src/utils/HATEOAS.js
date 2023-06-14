const transformResponse = (url = "http://localhost", port, endpoint, data) => {
  const finalUrl = `${url}${port ? `:${port}` : ""}/${endpoint}`;

  const total = data.length;
  const total_stock = data.reduce((acc, item) => {
    return acc + item.stock;
  }, 0);
  const results = data.map((item) => {
    return {
      name: item.nombre,
      url: `${finalUrl}/${item.id}`,
    };
  });

  return {
    total,
    total_stock,
    results,
  };
};

export { transformResponse };
