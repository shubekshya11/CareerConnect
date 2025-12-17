import nodemailer from "nodemailer";

// Configure the Nodemailer transporter
export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Configure the Nodemailer transporter
export function createTransporterTeamSource() {
  return nodemailer.createTransport({
    host: process.env.ZOHO_EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
  });
}
