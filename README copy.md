# Hiz Portfolio

This is a full-stack portfolio web application built with React (Vite, TypeScript, Tailwind CSS) for the frontend and Node.js/Express (with Supabase and Nodemailer) for backend contact form handling. The project is designed to be easily deployable on Vercel as a serverless app.

## Features

- Modern, responsive portfolio UI
- Contact form with email notifications and Supabase logging
- Modular React components (About, Portfolio, Services, Skills, Contact, etc.)
- Tailwind CSS for fast styling
- API routes for backend logic (contact form)
- Environment variable support for secrets

## Technologies Used

- React, TypeScript, Vite
- Tailwind CSS
- Supabase (database)
- Nodemailer (email)
- Express (for local backend)
- Vercel (for hosting)

## Getting Started

### Prerequisites

- Node.js & npm
- Supabase project (for contact form logging)
- Gmail account (for email notifications)

### Local Development

1. Clone the repository:
	```sh
	git clone https://github.com/Muhammad-Nouman-09/Hiz_portfolio.git
	cd Hiz_portfolio/Frontend
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Set up environment variables:
	- Copy `.env.example` to `.env` and fill in your Supabase and email credentials.
4. Start the frontend and backend together:
	```sh
	npm run dev
	```
	- The frontend runs on `http://localhost:3000`.
	- The backend API runs on `http://localhost:5000/api/contact` (proxied via Vite).

### Environment Variables

mail me for variables
```

## Deployment (Vercel)

1. Push your code to GitHub.
2. Import your repo on [vercel.com](https://vercel.com).
3. Set environment variables in the Vercel dashboard (do not use `.env` for secrets).
4. Deploy and test your live site.

## Folder Structure

- `Frontend/` — React app and API routes
  - `src/` — React components, pages, hooks, assets
  - `api/` — Express backend (contact form)
- `Backend/` — (legacy, not needed for Vercel)

## Contact

For questions or feedback, reach out via the contact form on the site or email: your_gmail@gmail.com

---
© Muhammad Nouman
