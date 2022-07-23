import chalk from "chalk";

export async function handleErrors(fn: any, async: boolean) {
  try {
    return async ? await fn : fn;
  } catch (err) {
    console.log(chalk.redBright("An error occurred:"));
    throw new Error(err, {
      cause: err,
    });
  }
}
