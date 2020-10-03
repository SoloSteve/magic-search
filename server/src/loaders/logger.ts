/*
Logger
======

Instantiates the logger with the configurations
corresponding to the environment.
 */

import * as winston from "winston";
import {env} from "process"

const transports = [];
if (env.NODE_ENV === "production") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "info"
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.simple(), winston.format.colorize({all: true})),
      level: "debug"
    })
  );
}

export default winston.createLogger({
  transports
});
