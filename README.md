# 🐦 Tweetprint

> **Turn any tweet into a beautiful, customizable picture.**

> **Made by Claude code and some few customization by myself**

![Project Status](https://img.shields.io/badge/Status-100%25%20Complete-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge\&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge\&logo=tailwindcss)

## 📖 Overview

**Tweetprint** is a modern web application that allows you to turn a tweet into a high-quality image.

You can either **create a tweet from scratch** or **paste a tweet URL** to automatically import its available content. The tweet can then be customized using different visual styles, backgrounds, spacing, borders, shadows, and other options before exporting it as a PNG or JPEG.

The entire editing and export experience runs directly in the browser, with **no login or API key required**.

## ✨ Features

### 📝 Create Tweets Manually

Create a tweet image from scratch with customizable:

* Display name
* Username / handle
* Verified badge
* Profile avatar
* Tweet text
* Attached image
* Date and time
* Reply count
* Retweet count
* Like count
* View count

### 🔗 Import From Tweet URL

Paste an X/Twitter post URL and Tweetprint uses X's public **oEmbed endpoint** to retrieve available tweet information.

The imported information is used to pre-fill:

* Tweet text
* Author name
* Author handle

Additional information such as avatars, media, engagement counts, and exact timestamps can be manually edited because they are not provided by the public oEmbed response.

### 🎨 Custom Styling

Customize the appearance of your generated tweet with:

* Light and dark themes
* Multiple background presets
* Solid backgrounds
* Gradient backgrounds
* Transparent backgrounds
* Adjustable padding
* Card corner radius
* Frame corner radius
* Drop shadows
* Optional watermark

### 🖼️ High-Quality Export

Export your finished tweet as:

* PNG
* JPEG

Choose from:

* 1× resolution
* 2× resolution
* 3× resolution

Tweetprint also provides a live dimension readout so you can see the final output size before exporting.

### 📋 Copy to Clipboard

Supported browsers can copy the generated tweet image directly to the clipboard using the **Clipboard Images API**.

### 🔒 Privacy-Friendly

Tweetprint does not require:

* User accounts
* Login
* API keys
* A database
* Server-side user accounts

The tweet editor and image generation run in the browser. The optional tweet URL import uses a server-side route to communicate with X's public oEmbed endpoint.

---

## 🛠️ Tech Stack

| Technology           | Purpose                                 |
| -------------------- | --------------------------------------- |
| **Next.js**          | React framework and application routing |
| **React**            | User interface                          |
| **TypeScript**       | Type-safe development                   |
| **Tailwind CSS v4**  | Styling                                 |
| **html-to-image**    | Image generation and export             |
| **X/Twitter oEmbed** | Tweet URL importing                     |

---

## 📂 Project Structure

```text
tweetprint/
├── app/
│   ├── api/
│   │   └── tweet/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Studio.tsx
│   ├── ControlPanel.tsx
│   ├── TweetCard.tsx
│   ├── ui.tsx
│   └── icons.tsx
│
├── lib/
│   ├── types.ts
│   └── format.ts
│
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

The main application workspace is handled by `Studio.tsx`, while `ControlPanel.tsx` provides the editing controls and `TweetCard.tsx` renders the tweet itself.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm

### 1. Clone the repository

```bash
git clone https://github.com/Ibrahist/tweetprint.git
```

### 2. Enter the project directory

```bash
cd tweetprint
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

```text
http://localhost:3000
```

The repository's current setup uses the standard Next.js development workflow.

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## 🔄 How It Works

```text
        ┌──────────────────────┐
        │     Open Tweetprint  │
        └──────────┬───────────┘
                   │
          ┌────────▼─────────┐
          │ Create manually  │
          │       OR         │
          │ Paste Tweet URL  │
          └────────┬─────────┘
                   │
          ┌────────▼─────────┐
          │  Edit Tweet Data │
          └────────┬─────────┘
                   │
          ┌────────▼─────────┐
          │ Customize Frame  │
          │ & Background     │
          └────────┬─────────┘
                   │
          ┌────────▼─────────┐
          │ Preview Result   │
          └────────┬─────────┘
                   │
          ┌────────▼─────────┐
          │ Export PNG/JPEG  │
          └──────────────────┘
```

---

## 🔗 Tweet URL Import

Tweetprint provides an API route:

```text
/app/api/tweet/route.ts
```

This route performs a server-side lookup against X's public oEmbed service. This approach avoids browser CORS restrictions and does not require an X API key.

### Important Limitation

X's public oEmbed response does not provide all tweet metadata.

Tweetprint therefore cannot automatically retrieve every piece of information, including:

* Profile avatars
* Attached media
* Exact engagement counts
* Original date/time

These values can be entered or adjusted manually after importing a tweet.

---

## 🎯 Use Cases

Tweetprint can be useful for:

* 📱 Social media content creation
* 📰 News and editorial graphics
* 📸 Creating tweet-style screenshots
* 🖼️ Presentations and documentation
* 🎨 Marketing materials
* 📚 Educational content
* 🗂️ Archiving important posts
* 💬 Creating shareable quote cards

---

## 🌐 Deployment

Tweetprint is a standard Next.js application and can be deployed to most platforms that support Next.js.

Possible deployment platforms include:

* Vercel
* Netlify
* Node.js servers
* Other Next.js-compatible hosting providers

No environment variables are required for the standard application setup.

---

## 🔐 Privacy

Tweetprint is designed to keep the editing and rendering process local to the user's browser.

There is:

* ❌ No login system
* ❌ No user account
* ❌ No database
* ❌ No required API key
* ❌ No server-side storage of generated images

Generated images are created directly in the browser.

---

## 🤝 Contributing

Contributions, improvements, bug reports, and feature requests are welcome.

### Fork the project

```bash
git clone https://github.com/Ibrahist/tweetprint.git
cd tweetprint
```

### Create a feature branch

```bash
git checkout -b feature/my-feature
```

### Make your changes

Test your changes locally:

```bash
npm run dev
```

### Commit your changes

```bash
git add .
git commit -m "Add my feature"
```

### Push your branch

```bash
git push origin feature/my-feature
```

Then open a Pull Request on GitHub.

---

## 📜 License

Tweetprint is released under the **MIT License**.

You are free to use, modify, and distribute the project according to the terms of the license.
I made it for myself but you can do whatever you'd like with this.

---

## 👨‍💻 Author

**Ibrahist**

GitHub:
https://github.com/Ibrahist

---

## ⭐ Support

If you find **Tweetprint** useful, consider giving the repository a ⭐ on GitHub.

Every star helps support the project and encourages further development.

---

## 🔗 Repository

https://github.com/Ibrahist/tweetprint

---

<p align="center">
  Made with ❤️ using Next.js and TypeScript
</p>
