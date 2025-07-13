import nodemailer from "nodemailer";

const sendMailToUser = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    service: "email",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error sending verification email", error);
    } else {
      return console.log("verification email sent", info.response);
    }
  });
};

export { sendMailToUser };
