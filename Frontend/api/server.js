import dotenv from "dotenv";
dotenv.config({ path: "portfolio.env" }); // Load env before anything else

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";


let  SUPABASE_URL="https://vqynkgagjatimhxixod.supabase.co"
let  SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxeW55a2dhZ2phdGltaHhpeG9kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxNDcwNiwiZXhwIjoyMDczNDkwNzA2fQ.A-ce-YsnkdBQyl5Vcs4t3jGPYTLQSuVn52NxrMWATu4"
let SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxeW55a2dhZ2phdGltaHhpeG9kIiwicm9zZSI6ImFub24iLCJpYXQiOjE3NTc5MTQ3MDYsImV4cCI6MjA3MzQ5MDcwNn0.Cbmsy00k3dgYghFRh60MObzUDK2ncs-FssgQFLKy4kk"
let SUPABASE_TABLE="hire_requests"

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Supabase client
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY // keep this secret, backend only!
);

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // 1️⃣ Save to Supabase table
    const { error: dbError } = await supabase
      .from(SUPABASE_TABLE)
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return res.status(500).json({ error: "Failed to save to database." });
    }

    // 2️⃣ Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3️⃣ Email to YOU
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    // 4️⃣ Auto-reply to client
    await transporter.sendMail({
      from: `"Nouman Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out 🚀",
      text: `Hi ${name},\n\nThanks for contacting me. I'll get back to you soon!\n\n— Nouman`,
    });

    res.status(200).json({ message: "Message sent & logged successfully!" });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Backend server is running.");
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
// node src/server.js to run the server