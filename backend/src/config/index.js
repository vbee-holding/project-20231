module.exports = {
  PORT: process.env.PORT || 8000,
  MONGODB_URL_DEV: process.env.MONGODB_URL_DEV,
  MONGODB_URL_PRODUCT: process.env.MONGODB_URL_PRODUCT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALLBACK_URL: process.env.DEPLOYED_CALLBACK_URL || process.env.CALLBACK_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
  BASE_URL : process.env.BASE_URL || 'http://localhost',
};
