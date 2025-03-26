import winston, { format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logDirectory = "./logs";

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.Console({ format: format.simple() }),
    new DailyRotateFile({
      dirname: logDirectory,
      filename: "%DATE%-app.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      level: "info",
    }),
  ],
});

export default logger;
