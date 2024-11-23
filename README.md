
# Bolt Store 🏪

A small full-stack e-commerce project built with Postgres, Express, React and Node.

[Click here to try out the current live version](https://ducphan-bolt-shop.vercel.app/)


## Features

- **User can Login with normal email/password or using Oath2**
 <img src="./media/login.png">

- **User can register**
 <img src="./media/Signup.png">

- **User can edit personal Information**
 <img src="./media/user.png">
 
- **User can manage admin dashboard, delete user, sort user,... Only admin can access this page**
 <img src="./media/admin.png">

- **User can add to cart, view cart, checkout using stripe payment**
  <img src="./media/checkout.png">
  
- **All orders are saved**
  <img src="./media/orders.png"> 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### client/.env
REACT_APP_API_URL=http://host.docker.internal:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...

### server/.env

Local
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=ecom
DB_HOST=host.docker.internal
DB_PORT=5433

Cors
CLIENT_URL=http://localhost:3000

Vercel config (copied from vercel)
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NO_SSL
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE

PORT
STRIPE_KEY (Stripe secret key)
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
FACEBOOK_CLIENT_ID
FACEBOOK_CLIENT_SECRET

## Deployment

- Create 2 new projects on vercel, one for client and one for backend
- For backend, create a postgres database on vercel

## Proxy
When proxy:
- frontend requests go to the same origin (e.g., http://localhost:3000/api)
- The proxy middleware internally forwards these requests to your backend
- From the browser's perspective, there's no cross-origin request happening
- Therefore, no CORS headers are needed
- Cookies and credentials work automatically because it appears as same-origin

When deployment:
- make sure axiosConfig.js is using full url
- proxy is not needed in client/src/setupProxy.js
