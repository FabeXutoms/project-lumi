const { format, createLogger, transports } = require("winston");
const { LOG_LEVEL } = require("../../config");

const formats = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.simple(),
    format.splat(),
    format.printf(info => {
        // Mesaj bir obje ise özelliklere eriş, değilse direkt kullan
        const message = typeof info.message === 'object' ? info.message : { log: info.message };
        
        return `${info.timestamp} ${info.level.toUpperCase()}: [email:${message.email || 'undefined'}] [location:${message.location || 'undefined'}] [procType:${message.proc_type || 'undefined'}] log:${message.log || message}]`
    })
);

const logger = createLogger({
    level: LOG_LEVEL,
    transports: [
        new transports.Console({ format: formats })
    ]
});

module.exports = logger;