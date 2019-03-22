/**
 * Created by: Jayce Azua
 * Date: 03/22/2019 
 */
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));
const sendEmail = (user) => {
  nodemailerMailgun.sendMail({
    from: 'no-reply@digitalmenu.com',
    to: user.email, // An array if you have multiple recipients.
    subject: `Thank you for signing up to Digital Menu!`,
    html: (`
    <h2>Welcome ${user.firstName} to Digital Menu!</h2>
    <p>Please wait while we confirm your account.</p>
    `),
  }).then((info) => {
    console.log('Email sent successfully');
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  sendEmail
}
