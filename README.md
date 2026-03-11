💰 FinanceTracker

FinanceTracker is a personal finance management backend API that allows users to track their income and expenses, calculate balance, and manage financial records securely.

The application includes JWT authentication, email verification, and MySQL database integration.

This project is built using Node.js, Express.js, and MySQL.

---

🚀 Features

🔐 Authentication

- User Sign Up
- User Login
- JWT Authentication (stored in cookies)
- Email verification using OTP
- Secure password hashing using bcrypt
- User logout functionality

💰 Finance Management

- Add income
- Add expense
- Edit income
- Edit expense
- Delete income
- Delete expense
- View income history
- View expense history
- Calculate total balance

📧 Contact System

- Contact form
- Email notification to admin
- Automatic reply email to user

🛡 Security

- JWT based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- Input validation

---

🛠 Technologies Used

Technology| Purpose
Node.js| Backend runtime
Express.js| Web framework
MySQL| Database
JWT| Authentication
bcrypt| Password hashing
Nodemailer| Email sending
dotenv| Environment variable management
cookie-parser| Cookie handling

---

📂 Project Structure

backend
│
├── controllers
│   ├── authControllers
│   └── transactionControllers
│
├── routes
│   ├── auth.routes.js
│   ├── transaction.route.js
│   ├── mail.route.js
│
├── middleware
│   └── protectedRoute.js
│
├── utils
│   ├── generateToken.js
│   └── sendMail.js
│
├── dbCredentials
│   └── db.connection.js
│
├── server.js
└── package.json

---

⚙️ Installation

1️⃣ Clone the repository

git clone https://github.com/shahnavazpathan/financetracker.git

2️⃣ Go to backend folder

cd financetracker/backend

3️⃣ Install dependencies

npm install

4️⃣ Create ".env" file

EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASS=your_email_password
PERSONAL_MAIL_ADDRESS=your_personal_email@gmail.com

JWT_SECRET=your_jwt_secret

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=finance_tracker
MYSQL_PORT=3306

5️⃣ Start the server

Development mode:

npm run dev

Production mode:

npm start

Server will run on:

http://localhost:1111

---

📡 API Routes

Authentication Routes

Sign Up

POST /api/auth/signUp

Verify Email

POST /api/auth/verify?otp=OTP_CODE

Sign In

POST /api/auth/signIn

Sign Out

POST /api/auth/signOut

---

Income Routes

Add Income

POST /api/add/income

Get Income

GET /api/get/income

Edit Income

PUT /api/edit/income/:dataId

Delete Income

DELETE /api/delete/income/:dataId

---

Expense Routes

Add Expense

POST /api/add/expense

Get Expense

GET /api/get/expense

Edit Expense

PUT /api/edit/expense/:dataId

Delete Expense

DELETE /api/delete/expense/:dataId

---

Balance Route

GET /api/get/balance

Returns total balance calculated as:

Balance = Total Income - Total Expense

---

Contact Route

Send Message

POST /api/sendmessage

Used to send messages from the website contact form.

---

🗄 Database Tables

users

Field| Description
userId| Primary key
userName| Username
password| Hashed password
email| Hashed email
isVerified| Email verification status

---

data

Field| Description
dataId| Transaction ID
userId| User ID
income| Income amount
expense| Expense amount
category| Transaction category
description| Description
account| Account type
date| Transaction date

---

otp_table

Field| Description
userId| User ID
otp| Email verification OTP

---

🔐 Authentication

Protected routes require JWT token stored in cookies.

Middleware verifies the token before allowing access to routes.

---

📌 Future Improvements

- Frontend UI (React / Next.js)
- Charts and analytics
- Monthly expense reports
- Mobile application
- Multi-account support

---

👨‍💻 Author

Shahnawaz Khan

Backend Developer
Node.js | Express | MySQL

GitHub:
https://github.com/shahnavazpathan
