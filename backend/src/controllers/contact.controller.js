import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    // Email to YOU
    await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: process.env.MAIL_ID,
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: getYourEmailTemplate(name, email, message),
    });

    // Confirmation to VISITOR
    await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: email,
      subject: "Thanks for reaching out!",
      html: getVisitorEmailTemplate(name),
    });

    res.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ success: false, message: "Failed to send" });
  }
};

// Email to YOU
const getYourEmailTemplate = (name, email, message) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Monaco', monospace; background: #0a0a0a; color: #d1d5db; }
    .container { max-width: 600px; margin: 0 auto; background: #0b1111; border: 1px solid #374151; border-radius: 8px; padding: 24px; }
    .header { border-bottom: 2px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px; }
    .title { color: #3b82f6; font-size: 24px; font-weight: bold; margin: 0; }
    .field { margin: 16px 0; }
    .label { color: #9ca3af; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; font-weight: bold; }
    .value { color: #f3f4f6; font-size: 14px; padding: 8px; background: #0a0a0a; border-radius: 4px; }
    .message { background: #0a0a0a; border-left: 3px solid #3b82f6; padding: 12px; margin: 12px 0; border-radius: 4px; white-space: pre-wrap; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #374151; color: #6b7280; font-size: 12px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="title">📬 New Message from ${name}</p>
    </div>
    <div class="field">
      <div class="label">From</div>
      <div class="value">${name} &lt;${email}&gt;</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="message">${message.replace(/\n/g, "<br>")}</div>
    </div>
    <div class="footer">
      <p>Received at ${new Date().toLocaleString("en-IN")}</p>
      <p style="font-size: 11px;">Reply-To: ${email}</p>
    </div>
  </div>
</body>
</html>
`;

// Email to VISITOR
const getVisitorEmailTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Monaco', monospace; background: #0a0a0a; color: #d1d5db; }
    .container { max-width: 600px; margin: 0 auto; background: #0b1111; border: 1px solid #374151; border-radius: 8px; padding: 24px; }
    .header { border-bottom: 2px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px; text-align: center; }
    .title { color: #3b82f6; font-size: 20px; font-weight: bold; margin: 0; }
    .content { color: #d1d5db; line-height: 1.8; }
    .highlight { color: #3b82f6; font-weight: bold; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #374151; color: #6b7280; font-size: 12px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="title">✓ Message Received</p>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thanks for reaching out! <span class="highlight">Your message has been successfully sent.</span></p>
      <p>I'll review it and get back to you as soon as possible. Keep an eye on your inbox!</p>
      <br>
      <p>Best regards,<br><strong>Karan Kumawat</strong></p>
    </div>
  </div>
</body>
</html>
`;
