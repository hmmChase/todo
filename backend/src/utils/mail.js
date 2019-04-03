import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const emailTemplate = body => `
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

export const mailResetToken = async (email, resetToken) => {
  try {
    await transport.sendMail({
      from: 'hmm@chase.com',
      to: email,
      subject: 'Your Password Reset Token',
      html: emailTemplate(
        `Your Password Reset Token is here!
        \n\n
        <a href="${
          process.env.NODE_ENV === 'production'
            ? process.env.PROD_FRONTEND_URL
            : process.env.DEV_FRONTEND_URL
        }/reset?resetToken=${resetToken}">Click Here to Reset</a>`
      )
    });
  } catch (err) {
    throw Error(`Error sending email. (${err})`);
  }
};
