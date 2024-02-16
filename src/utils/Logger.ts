const info = (message: string) => {
  return `\x1b[1;34m${message}\x1b[0m`;
};

const error = (message: string) => {
  return `\x1b[1;41m${message}\x1b[0m`;
};

const success = (message: string) => {
  return `\x1b[1;32m${message}\x1b[0m`;
};

const warning = (message: string) => {
  return `\x1b[1;33m${message}\x1b[0m`;
};

const bold = (message: string) => {
  return `\x1b[1m${message}\x1b[0m`; // Negrito
};

const getTime = (date: Date) => {
  const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  return `\x1b[1;90m${formattedTime}\x1b[0m`;
};

export { bold, error, getTime, info, success, warning };

