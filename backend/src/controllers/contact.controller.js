import nodemailer from 'nodemailer';

const CONTACT_EMAIL = process.env.MAIL_ID;
const CONTACT_EMAIL_PASSWORD = process.env.MAIL_PW;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    service: "gmail",
    auth: {
        user: CONTACT_EMAIL,
        pass: CONTACT_EMAIL_PASSWORD,
    },
});

export const sendmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: CONTACT_EMAIL,
      subject: `PixelPenguin : New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
};
