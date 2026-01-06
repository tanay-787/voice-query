module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    },
  };
};
