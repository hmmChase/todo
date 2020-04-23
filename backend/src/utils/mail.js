import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: '2525',
  auth: { user: '', pass: '' },
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
  try {
    await transport.sendMail({
      from: 'test@email.com',
      to: email,
      subject: 'Your Password Reset Token',
      html: emailTemplate(
        `Your Password Reset Token is here!
        \n\n
        <a href="${
          process.env.NODE_ENV === 'production'
            ? 'https://lhkfjdsaoir.now.sh'
            : 'http://localhost:8008'
        }/resetpassword?resetToken=${resetToken}&resetTokenExpiry=${resetTokenExpiry}">
          Click Here to Reset
        </a>`
      ),
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development')
      console.error('mailPasswordResetToken error: ', error);

    throw Error(`Error sending email. (${error})`);
  }
};
