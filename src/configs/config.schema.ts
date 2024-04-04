export default () => ({
  port: parseInt(process.env.APP_PORT) || 8080,
  database: process.env.DATABASE_URL,
  auth: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
  },
  alert: {
    apiUrl: process.env.ALERT_API_URL,
  },
});
