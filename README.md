# Translate Light Novel with AI

![Demo](./public/demo.png)

## Overview

A web application that helps translate text between different languages using AI models. Built with Nextjs and TypeScript.

## Features

- Translate text to multiple languages (default: Vietnamese)
- Real-time translation
- Copy translated text to clipboard
- Dark/Light mode support

## Tech Stack

- Nextjs
- TypeScript
- Tailwind CSS
- Shadcn UI
- AI SDK
- OpenRouter API

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/vanthom04/translate.git
   cd translate
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create `.env.local` file in root directory and add your OpenRouter API key:

   ```bash
   OPEN_ROUTER_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
