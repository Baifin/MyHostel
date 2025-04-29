import express from 'express';
import nodemailer from 'nodemailer';

// Create an instance of express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Configure Nodemailer with Gmail as the email service
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use 'gmail' for Gmail, or change to 'sendgrid' for SendGrid
  auth: {
    user: 'mohammedbaifin.m@gmail.com',  // Your email address
    pass: 'baifin$$$$',  // Your Gmail password or App Password
  },
});

// Function to send an email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: 'mohammedbaifin.m@gmail.com',  // Sender's email address
    to: to,  // Recipient email address
    subject: subject,  // Email subject
    text: text,  // Plain text body
    html: html,  // HTML body (optional)
  };

  // Send email and return promise
  return transporter.sendMail(mailOptions);
};

// Test route to send an email
app.post('/send-test-email', async (req, res) => {
  try {
    // Send email with the provided details
    await sendEmail(
      'eazytecat@gmail.com',  // Test email address
      'Test Email from MyHostel',
      'This is a plain text body for testing.',
      '<h1>This is a test email</h1><p>Welcome to MyHostel</p>'
    );

    // Send response if email sent successfully
    res.status(200).send({ message: 'Test email sent successfully!' });
  } catch (err) {
    // Log error and send failure response
    console.error('Email error:', err);
    res.status(500).send({ message: 'Failed to send test email' });
  }
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
