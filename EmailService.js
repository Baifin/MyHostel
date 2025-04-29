import nodemailer from 'nodemailer';

// Configure Nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use 'gmail' for Gmail, or change to 'sendgrid' for SendGrid
  auth: {
    user: 'Mohammedbaifin.m@gmail.com',  // Your email address
    pass: 'baifin$$$$',  // Your Gmail password or App Password
  },
});

// Function to send an email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: 'Mohammedbaifin.m@gmail.com',  // Sender's email address
    to: to,  // Recipient email address
    subject: subject,  // Email subject
    text: text,  // Plain text body
    html: html,  // HTML body (optional)
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
