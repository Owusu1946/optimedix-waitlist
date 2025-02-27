# OptiMediX Waitlist

A modern waitlist platform for OptiMediX AI - Next-generation ocular diagnostics powered by artificial intelligence.

## Overview

This waitlist application serves as the initial touchpoint for medical professionals and institutions interested in OptiMediX AI's advanced ocular diagnostic solutions. Built with Next.js 14 and modern web technologies, it offers a seamless registration experience with automated email notifications.

## Features

- **Streamlined Registration**: Simple and efficient waitlist signup process
- **Email Notifications**: Automated confirmation emails via Resend API
- **Modern UI**: Responsive design with smooth animations using Framer Motion
- **Analytics Ready**: Built-in tracking for waitlist metrics

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Email Service**: Resend
- **Font**: Geist Sans

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Owusu1946/optimedix-waitlist.git
cd optimedix-waitlist
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env.local` file with the following variables:
```env
RESEND_API_KEY=your_resend_api_key
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

<div align="center">
  <p>© 2024 OptiMediX AI. All rights reserved.</p>
</div>