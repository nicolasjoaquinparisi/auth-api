import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

const logger = createLogger({
  format: combine(
    timestamp(),
    colorize(),
    printf(({ timestamp, level, message, requestId, ...metadata }) => {
      let msg = `${timestamp} [${level}] [Request ID: ${requestId}]: ${message} `;

      if (Object.keys(metadata).length) {
        msg += JSON.stringify(metadata);
      }
      return msg;
    })
  ),
  transports: [new transports.Console()],
});

export default logger;
