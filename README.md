# CloudBite — Smart Cloud Kitchen MERN Project

A full-stack cloud kitchen food ordering and management system built with:

- React + Vite + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs authentication
- Axios REST API
- Recharts dashboard
- Razorpay integration-ready payment flow
- Cloudinary integration-ready image upload
- Customer, Admin, and Kitchen workflows

## Build order

1. Frontend UI
2. Cart
3. Authentication
4. API layer
5. Backend
6. MongoDB
7. Admin
8. Kitchen
9. Razorpay
10. Cloudinary
11. Deployment

## Requirements

- Node.js 18+ recommended
- MongoDB local or MongoDB Atlas account
- Optional: Razorpay account
- Optional: Cloudinary account

## Run

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend: http://localhost:5000

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend: http://localhost:5173

## Environment variables

Backend `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cloudbite
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=
```

## Demo accounts

After starting the backend:

```bash
npm run seed
```

Admin:
- Email: admin@cloudbite.com
- Password: Admin@123

Kitchen:
- Email: kitchen@cloudbite.com
- Password: Kitchen@123

Customer:
- Email: customer@cloudbite.com
- Password: Customer@123

Change these passwords before production use.

## Notes

- Razorpay is wired as an optional integration. If keys are empty, COD still works.
- Cloudinary is wired as an optional integration. If credentials are empty, the API returns a clear configuration error.
- Never commit `.env`.
- Payment signatures are verified on the backend.
- Order totals are calculated on the backend from database food prices.
