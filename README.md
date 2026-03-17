# Next.js frontend for the Spring Cloud Function example app

This is the example Next.js frontend that interfaces with the Spring Cloud Function example application. This project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running locally

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Generating the static site

You can generate a static site by making sure that _output: "export"_ is set in next.config.ts and then running
```bash
npm run build
```
The generated static site will appear in the _/out_ folder.

You can deploy this site to Azure Storage's Static Website feature, Azure Static Web Apps or Azure Web Apps.