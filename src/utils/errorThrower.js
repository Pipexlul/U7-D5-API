const throwErr = (err) => {
  let message;

  if (typeof err === "object") {
    message = err.message ?? err;
  } else {
    message = err;
  }

  return new Error(message);
};

export default throwErr;
