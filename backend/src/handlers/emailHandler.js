import nodemailer from 'nodemailer';
import ejs from 'ejs';
import juice from 'juice';

import { frontendUrl } from '../constants/config.js';
import logger from './logHandler.js';
import mailOptions from '../constants/mail.js';

const transport = nodemailer.createTransport(mailOptions);

const generateHTML = async (filename, options) => {
  const html = await ejs.renderFile(
    `${__dirname}/../views/email/${filename}.ejs`,
    options
  );

  // juice will inline the CSS for us in case we import CSS into our email views
  return juice(html);
};

// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// // javascript;

// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>'
// };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch(error => {
//     console.error(error);
//   });

export const sendEmail = async options => {
  const emailHtml = await generateHTML(options.filename, options);

  const mailOptions = {
    from: 'hmmStart <no-reply@hmmstart.com>',
    subject: options.subject,
    to: options.user.email,
    html: emailHtml
  };

  logger.info(`sending email, subject: ${options.subject}`);

  return transport.sendMail(mailOptions);
};

export const sendSignUpEmail = email => {
  const options = {
    filename: 'signUpEmail',
    subject: 'Welcome to hmmStart',
    user: { email }
  };

  sendEmail(options);
};

export const sendPassResetReqEmail = (
  email,
  passResetExpiry,
  passResetToken
) => {
  const passResetUrl = `${frontendUrl}/password_reset?token=${passResetToken}&expiry=${passResetExpiry}`;

  const options = {
    filename: 'passResetReqEmail',
    subject: 'Password Reset Request',
    user: { email },
    passResetUrl
  };

  sendEmail(options);
};
