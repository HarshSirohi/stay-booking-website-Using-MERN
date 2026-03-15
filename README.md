🏡 Stay Booking Website (MERN Stack)

A full-stack Stay Booking Platform built using the MERN Stack that allows users to explore, book, and manage stays similar to platforms like Airbnb with additional hotel-style features.

This application provides a seamless experience where users can browse properties, reserve stays, and manage bookings, while administrators can manage listings and users.

🚀 Live Demo

https://stay-booking.netlify.app/

🧠 Project Overview

The Stay Booking Website is a modern accommodation booking platform designed to simplify the process of finding and reserving stays.

Users can explore available properties, view detailed information, and make reservations. The system also supports authentication, image uploads, and reservation management.

The project demonstrates full-stack development skills, including backend API design, database management, and responsive frontend interfaces.

🛠 Tech Stack
Frontend

React.js

Redux Toolkit

HTML5

CSS3

JavaScript (ES6+)

Vite

Backend

Node.js

Express.js

MongoDB

Mongoose

Other Tools

Cloudinary (Image Upload)

JWT Authentication

REST API

CORS

dotenv

✨ Features
👤 User Features

User Registration & Login

Secure Authentication using JWT

Browse available stays

View property details

Book reservations

View reservation history

Responsive UI

🏠 Property Features

Property listings

Property images upload using Cloudinary

Property description and pricing

Location information

📅 Reservation Features

Book a stay

View booked reservations

Reservation management

⚙️ System Features

RESTful API architecture

Secure authentication

Cloud image storage

MongoDB database integration

📂 Project Structure
stay-booking-website-Using-MERN
│
├── client (Frontend)
│   ├── src
│   ├── components
│   ├── pages
│   └── redux
│
├── server (Backend)
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── database
│   └── index.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/HarshSirohi/stay-booking-website-Using-MERN.git
2️⃣ Install backend dependencies
cd server
npm install
3️⃣ Install frontend dependencies
cd client
npm install
4️⃣ Environment Variables

Create a .env file inside the server folder

Example:

PORT=3001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
5️⃣ Run the backend
cd server
npm run dev
6️⃣ Run the frontend
cd client
npm run dev
🌐 Deployment

Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
Image Storage: Cloudinary
