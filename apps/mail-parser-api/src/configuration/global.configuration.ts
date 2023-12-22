export const globalConfiguration = () => {
  return {
    port: parseInt(process.env.MAIL_PARSER_PORT, 10) || 3000,
  };
};
