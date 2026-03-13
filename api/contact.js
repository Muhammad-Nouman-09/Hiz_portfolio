import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const {
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_TABLE,
      EMAIL_USER,
      EMAIL_PASS,
      NODE_ENV,
    } = process.env;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_TABLE) {
      throw new Error("Missing Supabase environment variables.");
    }

    if (!EMAIL_USER || !EMAIL_PASS) {
      throw new Error("Missing email environment variables.");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    let dbWarning = null;

    try {
      const { error: dbError } = await supabase
        .from(SUPABASE_TABLE)
        .insert([{ name, email, message }]);

      if (dbError) {
        dbWarning = `Database log skipped: ${dbError.message}`;
      }
    } catch (error) {
      dbWarning = error instanceof Error ? `Database log skipped: ${error.message}` : "Database log skipped.";
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${EMAIL_USER}>`,
      replyTo: email,
      to: EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    await transporter.sendMail({
      from: `"Nouman Portfolio" <${EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out",
      text: `Hi ${name},\n\nThanks for contacting me. I'll get back to you soon!\n\n- Nouman`,
    });

    return res.status(200).json({
      message:
        process.env.NODE_ENV === "development" && dbWarning
          ? `Message sent. ${dbWarning}`
          : "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      error:
        process.env.NODE_ENV === "development" && error instanceof Error
          ? error.message
          : "Failed to send message.",
    });
  }
}
