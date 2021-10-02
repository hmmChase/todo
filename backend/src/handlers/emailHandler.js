import nodemailer from 'nodemailer';
import ejs from 'ejs';
import juice from 'juice';

import logger from './logHandler.js';
import { frontendUrl, mailOptions } from '../config';

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
    from: 'hmmStart <hmmstart@email.com>',
    to: options.user.email,
    subject: options.subject,
    html: emailHtml
  };

  logger.info(`sending email, subject: ${options.subject}`);

  return transport.sendMail(mailOptions);
};

export const sendSignUpEmail = email => {
  const options = {
    subject: 'Welcome to hmmStart',
    filename: 'signUpEmail',
    user: { email }
  };

  sendEmail(options);
};

export const sendPassResetEmail = (
  email,
  resetPassToken,
  resetPassTokenExpiry
) => {
  const resetPasswordUrl = `${frontendUrl}/reset-password?token=${resetPassToken}&expiry=${resetPassTokenExpiry}`;

  sendEmail({
    subject: 'Password Reset for hmmStart',
    filename: 'resetPassEmail',
    user: { email },
    resetPasswordUrl
  });
};
