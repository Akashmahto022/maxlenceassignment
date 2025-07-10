import nodemailer from "nodemailer";

const sendMailToUser = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "email",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
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
