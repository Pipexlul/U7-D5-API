/**
 * Determines if the given command line options are present in the
 * arguments passed to the program.
 *
 * @param {...string} opts - the command line options to check for
 * @return {boolean} true if any of the options are present, else false
 */
const hasOptions = (...opts) => {
  const args = process.argv.slice(2);

  for (const opt of opts) {
    const lowercaseOpt = opt.toLowerCase();

    if (args.some((arg) => arg.toLowerCase() === lowercaseOpt)) {
      return true;
    }
  }

  return false;
};

export { hasOptions };
