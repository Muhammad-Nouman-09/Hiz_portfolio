import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, route: "contact" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = await getRequestBody(req);
  const { name, email, message } = body;

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
    } = process.env;

    if (!EMAIL_USER || !EMAIL_PASS) {
      throw new Error("Missing email environment variables.");
    }
    let dbWarning = null;
    let autoReplyWarning = null;

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && SUPABASE_TABLE) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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
    } else {
      dbWarning = "Database log skipped: missing Supabase environment variables.";
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS.replace(/\s+/g, ""),
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${EMAIL_USER}>`,
      replyTo: email,
      to: EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    try {
      await transporter.sendMail({
        from: `"Nouman Portfolio" <${EMAIL_USER}>`,
        to: email,
        subject: "Thank you for reaching out",
        text: `Hi ${name},\n\nThanks for contacting me. I'll get back to you soon!\n\n- MuhammadNouman`,
      });
    } catch (error) {
      autoReplyWarning =
        error instanceof Error
          ? `Auto-reply skipped: ${error.message}`
          : "Auto-reply skipped.";
    }

    return res.status(200).json({
      message:
        process.env.NODE_ENV === "development" && (dbWarning || autoReplyWarning)
          ? `Message sent. ${[dbWarning, autoReplyWarning].filter(Boolean).join(" ")}`
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

async function getRequestBody(req) {
  if (req?.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req?.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  if (!req || typeof req.on !== "function") {
    return {};
  }

  return new Promise((resolve, reject) => {
    let rawBody = "";

    req.on("data", (chunk) => {
      rawBody += chunk;
    });

    req.on("end", () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}
