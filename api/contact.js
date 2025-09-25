import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Use environment variables (set in Vercel dashboard)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Save to Supabase
    const { error: dbError } = await supabase
      .from(process.env.SUPABASE_TABLE)
      .insert([{ name, email, message }]);

    if (dbError) {
      return res.status(500).json({ error: "Failed to save to database." });
    }

    // Send email to you
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    // Auto-reply to client
    await transporter.sendMail({
      from: `"Nouman Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out 🚀",
      text: `Hi ${name},\n\nThanks for contacting me. I'll get back to you soon!\n\n— Nouman`,
    });

    res.status(200).json({ message: "Message sent & logged successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message." });
  }
}