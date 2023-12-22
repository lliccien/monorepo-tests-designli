export const globalConfiguration = () => {
  return {
    port: parseInt(process.env.CONVERT_JSON_PORT, 10) || 3000,
  };
};
