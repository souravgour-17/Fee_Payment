<!-- # 🎓 Souravian University - College Fee Payment System

![GitHub stars](https://img.shields.io/github/stars/yourusername/college_fee_payment?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/college_fee_payment?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/college_fee_payment?color=red&style=flat-square)
![GitHub license](https://img.shields.io/github/license/yourusername/college_fee_payment)

A modern **web application** for students of **Souravian University** to securely view and pay college fees online. Streamlines the fee payment process with a responsive and user-friendly interface.  

---

## 🌐 Demo

Check out the live application here: [https://fee-payment-frontend.onrender.com](https://fee-payment-frontend.onrender.com)

---

## ✨ Features

- ✅ Student registration & login with **JWT authentication**  
- ✅ Secure login; authenticated users stored in MongoDB  
- ✅ View fee details & payment history  
- ✅ Online fee payments  
- ✅ Admin panel to manage students & payments  
- ✅ CRUD operations for students & fees  
- ✅ Responsive design for desktop & mobile  

---

## 🔒 Authentication Flow

- Students register or login using email/password.  
- Upon login, a JWT token is generated and stored in the client (localStorage or cookies).  
- **After logging in, you may need to refresh the page to load the next page correctly.**  
- The token is sent with requests to access protected routes (like viewing payment history).  
- Only authenticated users can access fee details and payment history.  
- User data is saved securely in MongoDB.

---

## 💻 Tech Stack

| Frontend | Backend | Database |
|----------|---------|---------|
| React.js | Node.js & Express.js | MongoDB |
| Tailwind CSS / CSS | Mongoose | JWT Authentication |

---

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/souravgour-17/college_fee_payment.git
   cd college_fee_payment
Install backend dependencies

bash
Copy code
cd backend
npm install
Install frontend dependencies

bash
Copy code
cd ../frontend
npm install
Configure environment variables
Create a .env file in backend:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the project

Backend

bash
Copy code
cd backend
npm run dev
Frontend

bash
Copy code
cd ../frontend
npm start
🔒 Authentication Flow
Students register or login using email/password.

Upon login, a JWT token is generated and stored in the client (localStorage or cookies).

The token is sent with requests to access protected routes (like viewing payment history).

Only authenticated users can access fee details and payment history.

User data is saved securely in MongoDB.

🤝 Contributing
Fork the project

Create a feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add YourFeature')

Push to the branch (git push origin feature/YourFeature)

Open a pull request

📬 Contact
Developer: Sourav Gour

Email: souravgour798@gmail.com

GitHub: souravgour-17

LinkedIn: Sourav Gour

Made with ❤️ using React, Node.js, MongoDB, and JWT authentication.
 -->


###🎓 Souravian University - College Fee Payment System

A modern web application for students of Souravian University to securely view and pay college fees online.
🚀 Streamlines the fee payment process with a responsive, scalable, and secure system.

###🌐 Demo

Check out the live application here: [https://fee-payment-frontend.onrender.com](https://fee-payment-frontend.onrender.com)


###✨ Features


✅ Student registration & login with JWT authentication

✅ Email verification system before login access

✅ Gmail OTP login support (extra secure authentication)

✅ Cookie consent before login

✅ Secure login; authenticated users stored in MongoDB

✅ View fee details & payment history

✅ Online fee payments

✅ Admin panel to manage students & payments

✅ CRUD operations for students & fees

✅ Responsive design for desktop & mobile

✅ Professional, modern login & registration UI


###🔒 Authentication Flow


Students register with Name, Email, Password.

An email verification link is sent to confirm the account.

Users can also login via Gmail OTP verification.

After successful verification, a JWT token is generated and stored securely.

Only verified & authenticated users can access protected routes (like payment history).

User data is stored securely in MongoDB.

###💻 Tech Stack

Frontend	Backend	Database	Security	Deployment
React.js ⚛️	Node.js & Express.js 🚀	MongoDB 🍃	JWT Authentication 🔑	Render ☁️
Tailwind CSS 🎨	Nodemailer ✉️	Mongoose 🗂	Gmail OTP 🔐	GitHub Actions (CI/CD) ⚡
🛠 Installation
1. Clone the repository
git clone https://github.com/souravgour-17/college_fee_payment.git
cd college_fee_payment

2. Install backend dependencies
cd backend
npm install

3. Install frontend dependencies
cd ../frontend
npm install

4. Configure environment variables

Create a .env file in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

5. Run the project

Backend

cd backend
npm run dev


Frontend

cd ../frontend
npm start

###🤝 Contributing

Fork the project 🍴

Create a feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add YourFeature')

Push to the branch (git push origin feature/YourFeature)

Open a pull request 📩

###📬 Contact

👨‍💻 Developer: Sourav Gour
📧 Email: souravgour798@gmail.com

💻 GitHub: souravgour-17

🔗 LinkedIn: Sourav Gour


✨ Made with ❤️ using React, Node.js, MongoDB, and JWT authentication.