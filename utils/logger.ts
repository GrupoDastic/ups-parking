/**
 * Logger utility for the UPS Parking application
 * Provides functions for different log levels and allows for easy configuration
 */

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

// Default configuration
const defaultConfig = {
  level: __DEV__ ? LogLevel.DEBUG : LogLevel.ERROR, // In development, log everything; in production, only errors
  enableConsole: __DEV__, // Only log to console in development
};

// Current configuration
let config = { ...defaultConfig };

/**
 * Configure the logger
 * @param newConfig - New configuration options
 */
export const configureLogger = (newConfig: Partial<typeof config>) => {
  config = { ...config, ...newConfig };
};

/**
 * Reset logger configuration to defaults
 */
export const resetLoggerConfig = () => {
  config = { ...defaultConfig };
};

/**
 * Log a debug message
 * @param message - Message to log
 * @param data - Additional data to log
 */
export const debug = (message: string, data?: any) => {
  if (config.level <= LogLevel.DEBUG && config.enableConsole) {
    console.debug(`[DEBUG] ${message}`, data);
  }
};

/**
 * Log an info message
 * @param message - Message to log
 * @param data - Additional data to log
 */
export const info = (message: string, data?: any) => {
  if (config.level <= LogLevel.INFO && config.enableConsole) {
    console.info(`[INFO] ${message}`, data);
  }
};

/**
 * Log a warning message
 * @param message - Message to log
 * @param data - Additional data to log
 */
export const warn = (message: string, data?: any) => {
  if (config.level <= LogLevel.WARN && config.enableConsole) {
    console.warn(`[WARN] ${message}`, data);
  }
};

/**
 * Log an error message
 * @param message - Message to log
 * @param error - Error object or additional data
 */
export const error = (message: string, error?: any) => {
  if (config.level <= LogLevel.ERROR && config.enableConsole) {
    console.error(`[ERROR] ${message}`, error);
  }
};

// Export a default object with all functions
const logger = {
  debug,
  info,
  warn,
  error,
  configureLogger,
  resetLoggerConfig,
  LogLevel,
};

export default logger;