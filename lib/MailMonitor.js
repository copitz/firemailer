const admin = require('firebase-admin');
const config = require('../config');
const Nodemailer = require('nodemailer');

require('colors');

module.exports = class MailMonitor {
  constructor() {
    admin.initializeApp({
      databaseURL: config.firebase.url,
      credential: admin.credential.cert(config.firebase.serviceAccount)
    });
    this.setPath(config.firebase.path);
    this.setTransport(config.transport);
  }

  setPath(path) {
    if (this.ref) {
      this.ref.off('child_added');
    }
    this.ref = admin.database().ref().child(path);
    this.ref.on('child_added', (sn) => {
      this.transport.sendMail(sn.val()).then(
        (info) => {
          sn.ref.remove();
          console.log('Sent mail %s'.green, sn.key);
          console.log(info);
        },
        (error) => {
          console.error('Mail delivery failed for record %s: %s'.red, sn.key, (error+'').replace(/^Error: /, ''));
          console.error(error);
        }
      );
    });
    console.log('Monitoring path %s'.blue, path);
  }

  setTransport(transport) {
    this.transport = Nodemailer.createTransport(transport);
  }
};