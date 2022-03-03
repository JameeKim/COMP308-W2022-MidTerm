import path from "path";

import { config as dotenv } from "dotenv";

export interface Config {
  dbUri: string;
}

/**
 * All config values for this app
 *
 * This is the default export of this module
 */
const config: Config = {
  dbUri: "",
};
export default config;

// Read .env file
const readEnv = (filename: string): void => {
  dotenv({ path: path.resolve(process.cwd(), filename) });
};

/**
 * Read .env files and populate config values
 *
 * Probably don't call this more than once
 */
export const initConfig = (): void => {
  readEnv(".env.local");
  readEnv(".env");

  if (process.env.DB_URI) {
    config.dbUri = process.env.DB_URI;
  }
};
