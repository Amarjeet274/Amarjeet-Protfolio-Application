const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Utility function to escape HTML and prevent XSS
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post(
  '/',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('message').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.RECIPIENT_EMAIL) {
      return res.status(503).json({
        error: 'Contact email is not configured. Add EMAIL_USER, EMAIL_PASS, and RECIPIENT_EMAIL to the server environment.',
      });
    }

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        replyTo: email,
        subject: `New message from ${escapeHtml(name)}`,
        html: `
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong> ${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `,
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send email' });
    }
  }
);

module.exports = router;
