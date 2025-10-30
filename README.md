
# 🗣️ Opinion Board

## 📌 Description
Opinion Board is a full-stack web application that allows users to post, view, and manage opinions on various topics. It provides a clean, responsive interface for sharing opinion with others. The platform supports user authentication, personalized opinion tracking, and dynamic filtering and search — making it a robust showcase of modern web development practices.

## 🛠 Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Other Tools**: Git, RESTful APIs

## 🚀 Features
- 🔐 JWT-based authentication for secure login 
- 🔍 Search and filter opinions by keywords or categories
- 👤 Profile-based opinion tracking for personalized user views
- 📱 Responsive design for mobile and desktop
- 🔄 Frontend-backend integration using RESTful APIs

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Opinion-Board.git
cd Opinion-Board
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:
```env
PORT=8080
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### 4. Run the App

#### Backend
```bash
npm start
```

#### Frontend
```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

## 🖼️ Screenshots


<img width="1910" height="851" alt="Screenshot 2025-10-30 221603" src="https://github.com/user-attachments/assets/09224b76-d144-4dfb-9c8d-0ad8cf810e1d" />

<img width="1903" height="947" alt="Screenshot 2025-10-30 221357" src="https://github.com/user-attachments/assets/90ad8e2a-f7d2-4f86-a94e-7337e56a5798" />

<img width="1909" height="901" alt="Screenshot 2025-10-30 221424" src="https://github.com/user-attachments/assets/da6c93ca-e028-444c-958e-632edb7cf01c" />

<img width="1907" height="895" alt="Screenshot 2025-10-30 221545" src="https://github.com/user-attachments/assets/5ff35c87-07ac-49c0-9075-1c70f3133774" />

<img width="1904" height="891" alt="Screenshot 2025-10-30 221509" src="https://github.com/user-attachments/assets/3f0738b5-47d8-447a-9a49-3d6a28f5e705" />


## 👤 Contact:
**Jasmeet Kaur**  
📧 Email: jasmeetkaur31dec@gmail.com
🔗 Linkedin: www.linkedin.com/in/jasmeet-kaur-499678298

## 📈 Scaling for Production

To scale the frontend-backend integration for production:

- Use a reverse proxy (e.g., Nginx) to route traffic between frontend and backend
- Optimize MongoDB with indexing and query tuning
- Implement rate limiting and input validation to protect against abuse
- Use environment-based configuration for flexible deployment
```

---

Let me know if you'd like help customizing the `.env` setup, adding deployment instructions, or inserting screenshots. You're almost there!
