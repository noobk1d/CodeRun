# CodeRun - Online Code Compiler

CodeRun is an online code execution platform that allows users to write and run code in multiple programming languages instantly.

## 🚀 Live Demo

[Click here to try CodeRun](https://code-run-five.vercel.app/)

---

## 🛠 Tech Stack

### Frontend:

- **React (Vite)** - For fast and efficient UI rendering
- **Tailwind CSS** - For styling
- **Axios** - For making API requests

### Backend:

- **Node.js & Express** - For API development
- **CORS & Body-parser** - Middleware handling
- **Render** - For backend deployment

---

## 📜 How to Run the Project Locally

### 🔹 Clone the Repository

```sh
git clone https://github.com/noobk1d/CodeRun.git
cd coderun
```

### 🔹 Running the Frontend

```sh
cd frontend\coderun  # Navigate to the frontend directory
npm install  # Install dependencies
npm run dev  # Start the development server
```

The frontend should now be running on `http://localhost:5173/`

### 🔹 Running the Backend

```sh
cd backend  # Navigate to the backend directory
npm install  # Install dependencies
npm run start  # Start the backend server
```

The backend should now be running on `http://localhost:5000/`

---

## 📡 API Endpoints - Integrate into Your Project

### 🔹 1. Fetch Available Languages

**Endpoint:** `https://coderun-0he1.onrender.com/`

**Request:**

```http
GET api/code/get-all-languages
```

**Response Format:**

```json
{
  "supported_languages": [
        {
            "language": "matl",
            "version": "22.5.0",
            "aliases": []
        },
        {
            "language": "matl",
            "version": "22.7.4",
            "aliases": []
        },
        Other languages......
  ]
}
```

### 🔹 2. Execute Code

**Endpoint:** `https://coderun-0he1.onrender.com/`

**Request:**

```http
POST api/code/code-execute
Content-Type: application/json
```

**Request Body:**

```json
{
  "language": "javascript",
  "version": "18.15.0",
  "code": "console.log('Hello, World!');"
}
```

**Response Format:**

```json
{
  "success": true,
  "language": "javascript",
  "version": "18.15.0",
  "output": "Hello, World!\n",
  "error": ""
}
```

---

## 📝 How to Use CodeRun

1. Select a programming language from the sidebar.
2. Write or paste your code in the editor.
3. Click the **Run** button to execute the code.
4. View the output in the result section.
5. Click **Share** to copy the code to your clipboard.

---

## 💡 Contributing

Contributions are welcome!

---
