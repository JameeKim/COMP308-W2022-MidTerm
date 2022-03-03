import { connect } from "mongoose";

import config from "./env";

/**
 * Initialize the database connection
 *
 * Do not call this more than once
 */
export const initDatabase = (): void => {
  connect(config.dbUri, {}).then(() => {
    console.log("Connected to the database!");
  }).catch((err) => {
    console.error("Failed to connect to the database...");
    console.error(err);
  });
};
