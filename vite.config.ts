import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "node:fs";
import contactHandler from "./api/contact.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: "contact-api-dev-middleware",
      configureServer(server) {
        const envPath = path.resolve(__dirname, ".env");

        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, "utf8");

          for (const line of envContent.split(/\r?\n/)) {
            const trimmed = line.trim();

            if (!trimmed || trimmed.startsWith("#")) {
              continue;
            }

            const separatorIndex = trimmed.indexOf("=");

            if (separatorIndex === -1) {
              continue;
            }

            const key = trimmed.slice(0, separatorIndex).trim();
            const value = trimmed
              .slice(separatorIndex + 1)
              .trim()
              .replace(/^['"]|['"]$/g, "");

            if (!(key in process.env)) {
              process.env[key] = value;
            }
          }
        }

        server.middlewares.use("/api/contact", async (req, res, next) => {
          if (req.method === "OPTIONS") {
            res.statusCode = 204;
            res.end();
            return;
          }

          if (req.method !== "POST") {
            next();
            return;
          }

          try {
            const body = await new Promise<Record<string, unknown>>((resolve, reject) => {
              let rawBody = "";

              req.on("data", (chunk) => {
                rawBody += chunk;
              });

              req.on("end", () => {
                try {
                  resolve(rawBody ? JSON.parse(rawBody) : {});
                } catch (error) {
                  reject(error);
                }
              });

              req.on("error", reject);
            });

            await contactHandler(
              { method: req.method, body },
              {
                status(code: number) {
                  res.statusCode = code;

                  return {
                    json(payload: unknown) {
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(payload));
                    },
                  };
                },
              },
            );
          } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid JSON payload." }));
          }
        });
      },
    },
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
