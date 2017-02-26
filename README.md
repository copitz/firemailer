Firemailer
==========

Write e-mails to Firebase database and let them get sent with [Nodemailer](https://nodemailer.com)

This tiny daemon script monitors a configurable firebase path for emails and passes them to Nodemailer to let them get sent over SMTP or another Nodemailer transporter.

Installation
============
    
### Docker compose

The quickest way to get this up and running as the docker-compose already contains [Docker-SMTP](https://hub.docker.com/r/namshi/smtp/).

    git clone git@github.com:copitz/firemailer.git
    cd firemailer
    docker-compose up

### Docker

    docker run -v config.js:/opt/app/config.js copitz/firemailer

### Node

    git clone git@github.com:copitz/firemailer.git
    cd firemailer
    cp config.example.js config.js
    npm install
    node app.js
    
    
Configuration
=============

 - Copy config.example.js to config.js
 - Set the correct Firebase URL
 - Set your transport options as for [nodemailer.createTransport()](https://nodemailer.com/usage/)
 
Sending an email
================

Assuming you set `config.firebase.path` to `"mails"` and the firemailer daemon is running, sending an email via firebase is as easy as:

    Firebase.database().ref('mails').push({
        to: 'john.doe@example.com',
        from: '"Christian Opitz" <co@example.com>',
        subject: 'Hello world',
        text: 'Lorem ipsum dolor sit amet'
    });
