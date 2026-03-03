# Baksy

[![GitHub stars](https://img.shields.io/github/stars/nishuR31/baksy?style=social)](https://github.com/nishuR31/baksy)
[![GitHub forks](https://img.shields.io/github/forks/nishuR31/baksy?style=social)](https://github.com/nishuR31/baksy/fork)
[![GitHub issues](https://img.shields.io/github/issues/nishuR31/baksy)](https://github.com/nishuR31/baksy/issues)

[![TypeScript](https://img.shields.io/badge/Typescript-000000?logo=typescript&logoColor=000&color=3178c6)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Nodejs-000000?logo=nodedotjs&logoColor=000&color=5FA04E)](https://www.nodejs.org/)
[![NPM](https://img.shields.io/badge/Npm-000000?logo=NPM&logoColor=000&color=CB3837)](https://www.npmjs.org/)
[![JavaScript](https://img.shields.io/badge/Javascript-000000?logo=javascript&logoColor=000&color=f7df1e)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=fff&color=000)](https://expressjs.com/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?logo=fastify&logoColor=fff&color=000)](https://www.fastify.io/)
[![Cookies](https://img.shields.io/badge/Cookies-000000?logo=cookiecutter&logoColor=000&color=4b8bbe)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
[![REST API](https://img.shields.io/badge/Rest-000000?logo=R&logoColor=000&color=0052cc)](https://restfulapi.net/)
[![Stripe](https://img.shields.io/badge/Stripe-000000?logo=stripe&logoColor=000&color=635bff)](https://stripe.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-000000?logo=razorpay&logoColor=000&color=2b80ff)](https://razorpay.com/)
[![PayPal](https://img.shields.io/badge/Paypal-000000?logo=paypal&logoColor=000&color=00457c)](https://paypal.com/)
[![Paytm](https://img.shields.io/badge/Paytm-000000?logo=paytm&logoColor=000&color=20336B)](https://www.npci.org.in/upi/product-overview)
[![GPay](https://img.shields.io/badge/Gpay-000000?logo=googlepay&logoColor=000&color=4285F4)](https://www.npci.org.in/upi/product-overview)

[![Meta OAuth](https://img.shields.io/badge/Meta-000000?logo=meta&logoColor=000&color=4267b2)](https://developers.facebook.com/docs/facebook-login/)
[![Email](https://img.shields.io/badge/email-000000?logo=Email&logoColor=000&color=ea4335)](mailto:nishangithub@gmail.com)
[![Docker](https://img.shields.io/badge/Docker-000000?logo=docker&logoColor=000&color=00bcd4)](https://docker.io/)
[![Microservice](https://img.shields.io/badge/Microservice-000000?logo=microstation&logoColor=fff&color=000)](https://microservices.io/)
[![Monolith](https://img.shields.io/badge/Monolith-000000?logo=monster&logoColor=fff&color=000)](https://en.wikipedia.org/wiki/Monolithic_application)
[![Google OAuth](https://img.shields.io/badge/Google-4285f4?logo=google&logoColor=white)](https://developers.google.com/identity/protocols/oauth2)
[![Google Auth](https://img.shields.io/badge/Google%20Authenticator-4285f4?logo=googleauthenticator&logoColor=white)](https://developers.google.com/identity/protocols/oauth2)
[![GitHub OAuth](https://img.shields.io/badge/Github-181717?logo=github&logoColor=white)](https://docs.github.com/en/apps/oauth-apps)

Baksy is a modern, closed-source backend scaffolding CLI for rapidly building, configuring, and deploying production-ready backend projects. It helps you scaffold APIs, authentication, payment integrations, and more, with minimal setup. Baksy is dev-friendly, fast, and simple to use—no complex setup required.

## Features

- Scaffold backend projects with a single CLI command
- Built-in authentication (passwordless, OAuth, 2FA)
- Payment integration (Stripe, Razorpay, PayPal, UPI, etc.)
- Database, caching, and queueing setup
- Modern, prod-first design
- Extensible and configurable for your stack
- Type safety with TypeScript/JavaScript support

## Installation

**Install Baksy CLI globally:**

```bash
npm install -g baksy
# or
yarn global add baksy
# or
pnpm add -g baksy
```

or

```bash
npx baksy --commands
```



## How to Use Baksy CLI

1. **Login:**

```bash
baksy login --token
```

Authenticate with your credentials or use demo mode.

2. **Scaffold a new backend project:**

   ```bash
   baksy create my-backend-app
   ```

3. **Configure features:**

   ```bash
   cd my-backend-app
   baksy add auth
   baksy add payments
   baksy add 2fa
   # ...other features
   ```

4. **Run your backend locally:**

   ```bash
   npm run dev
   ```

## Legal & Privacy

- See [Privacy Policy](https://baksy.vercel.app/privacy) and [Terms of Service](https://baksy.vercel.app/terms).

## Example: Scaffold & Run a Project

```bash
# Login (or use demo)
baksy login
# Scaffold a new backend
baksy create my-backend
# Add authentication and payments
cd my-backend
basky add auth
basky add payments
# Start the backend
npm run dev
```

## About

Baksy is a backend scaffolding CLI and platform. It helps you bootstrap production-ready backend projects with authentication, payments, and more. Baksy is designed for developers, teams who want to move fast with best practices and privacy in mind with prior knowledge and to increase efficiency.

## Contact

- GitHub: [nishuR31](https://github.com/nishuR31)
- Email: [nishangithub@gmail.com](mailto:nishangithub@gmail.com)

Enjoy using Baksy CLI!

---
