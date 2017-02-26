/**
 * This config file is provided as a convenience for development. You can either
 * set the environment variables on your server or modify the values here.
 *
 * At a minimum, you must set FB_URL.
 */

module.exports = {
  firebase: {
    url: process.env.FB_URL || 'https://<YOUR APP>.firebaseio.com',
    path: process.env.FB_PATH || 'mails',
    serviceAccount: process.env.FB_ACCOUNT || 'service-account.json'
  },
  // Nodemailer transport configuration
  transport: {
    host: process.env.SMTP_HOST || 'localhost',
    port: process.env.SMTP_PORT || 25
  }
};
