import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'debug',  
    format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),  
    ],
});

export default logger;