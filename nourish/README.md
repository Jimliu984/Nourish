## Nourish Web App
The Nourish web app will make use of the following features
- The app will talk to an API, storing data in a SQLite database through prisma

## Important development steps
Prisma generation

1. **Install Prisma and SQLite:**
   npm install prisma @prisma/client sqlite3

2. **Initialize Prisma:**
   npx prisma init

   This creates a `prisma` folder with a `schema.prisma` file.

3. **Configure your database:**
   In `prisma/schema.prisma`, set the datasource to SQLite:

   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }

4. **Define your models:**
   Edit `prisma/schema.prisma` to add your data models.

5. **Generate Prisma Client & migrate:**
   npx prisma migrate dev --name init
   OR
   Run everytime model changes. This is what I do normally as migrate is a bit more involved
   npx prisma db push

6. **Use Prisma Client in your API routes:**
   Import and use Prisma Client in your Next.js API files:
   ```typescript
   import { PrismaClient } from '@prisma/client'
   const prisma = new PrismaClient()
   // Example usage
   const users = await prisma.user.findMany()
   ```







This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
