const transformResponse = (url = "http://localhost", port, endpoint, data) => {
  const finalUrl = `${url}${port ? `:${port}` : ""}/${endpoint}`;

  const total = data.length;
  const results = data.map((item) => {
    return {
      name: item.nombre,
      url: `${finalUrl}/${item.id}`,
    };
  });

  return {
    total,
    results,
  };
};

export { transformResponse };
