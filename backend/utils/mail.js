import nodemailer from 'nodemailer';
import {
  mailHost,
  mailPort,
  frontendUrlDev,
  frontendUrlProd,
} from '../config';

const transport = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

const emailTemplate = (body) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <p>${body}</p>
  </div>
`;

export default async (email, resetToken, resetTokenExpiry) => {
  const frontendUrl =
    process.env.NODE_ENV === 'production' ? frontendUrlProd : frontendUrlDev;

  const resetPassUrl = `${frontendUrl}/resetpassword?resetToken=${resetToken}&resetTokenExpiry=${resetTokenExpiry}`;

  const emailBody = `
    Your Password Reset Token is here!
    \n\n
    <a href="${resetPassUrl}">Click Here to Reset</a>
  `;

  try {
    await transport.sendMail({
      from: 'test@email.com',
      to: email,
      subject: 'Your Password Reset Token',
      html: emailTemplate(emailBody),
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development')
      console.error('mailPasswordResetToken error: ', error);

    throw Error(`Error sending email. (${error})`);
  }
};
