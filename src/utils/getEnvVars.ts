import dotenv from 'dotenv';
export const getEnvVars = () => {
  const keys = dotenv.config().parsed;

  return keys;
};
