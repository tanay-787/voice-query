module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      AZURE_SPEECH_SERVICE_KEY: process.env.AZURE_SPEECH_SERVICE_KEY,
      AZURE_REGION: process.env.AZURE_REGION,
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN
    },
  };
};
