const mailOptions = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: { user: process.env.MAILTRAP_USER, pass: process.env.MAILTRAP_PASS }
};

export default mailOptions;
