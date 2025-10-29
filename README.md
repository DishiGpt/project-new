# 🔥 IgniteX - Job Portal

**Where Ambition Sparks Opportunity**

A modern, MERN-stack job portal application built with the MERN stack, featuring an elegant dark theme and a clean, professional user interface.

---

## 🚀 Features

### For Job Seekers
- 🔍 **Smart Job Search** - Search jobs by title, location, or description
- 🎯 **Advanced Filters** - Filter by industry, work type, and location
- 📱 **Responsive Design** - Seamless experience across all devices
- 💼 **Job Applications** - Easy one-click apply to jobs
- 👤 **Profile Management** - Update profile, resume, and skills
- 📊 **Application Tracking** - Track all your job applications

### For Recruiters
- 🏢 **Company Management** - Create and manage company profiles
- ✍️ **Post Jobs** - Easy job posting with detailed descriptions
- 📋 **Applicant Management** - Review and manage job applications
- 📈 **Dashboard** - View all posted jobs and applicants
- 🎨 **Rich Job Listings** - Add requirements, salary, location, and more

### Design Highlights
- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🌓 **Dark/Light Mode** - Toggle between elegant dark and light themes
- 🎭 **Glassmorphism Effects** - Modern glass-like UI components
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 🎨 **Color Palette** - Indigo, Purple, and Teal accent colors

---

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern React with Hooks
- **Vite** - Lightning-fast build tool
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication & authorization
- **Bcrypt** - Password hashing
- **Cloudinary** - Image/file storage
- **Cookie Parser** - Cookie handling
- **Multer** - File upload handling
- **Dotenv** - Environment variables

---

## 📁 Project Structure

```
project-new/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/           # Database schemas
│   ├── routes/           # API routes
│   ├── middlewares/      # Auth & error handling
│   ├── utils/            # Helper functions & DB
│   └── index.js          # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── admin/    # Recruiter dashboard
│   │   │   ├── auth/     # Login/Signup
│   │   │   ├── shared/   # Navbar, Footer
│   │   │   └── ui/       # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── redux/        # State management
│   │   ├── utils/        # Constants & helpers
│   │   ├── App.jsx       # Main app component
│   │   └── index.css     # Global styles
│   └── public/           # Static assets
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project-new
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Create `.env` file in backend folder**
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

4. **Frontend Setup**
```bash
cd ../frontend
npm install
```

5. **Run the Application**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

6. **Open in Browser**
```
http://localhost:5173
```

---

## 🎨 Color Palette

### IgniteX Theme
- **Primary (Indigo)**: `#6366F1` - Main brand color
- **Secondary (Teal)**: `#14B8A6` - Cool accent
- **Accent (Purple)**: `#A855F7` - Refined highlight

### Light Mode
- **Background**: Pure White (`#FFFFFF`)
- **Foreground**: Slate-900 (`#0F172A`)
- **Cards**: White with subtle shadows

### Dark Mode
- **Background**: Slate-900 (`#0F172A`)
- **Foreground**: Slate-100 (`#F1F5F9`)
- **Cards**: Slate-800 with glow effects

---

## 📚 API Endpoints

### User Routes
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `POST /api/v1/user/profile/update` - Update profile

### Job Routes
- `GET /api/v1/job/get` - Get all jobs
- `GET /api/v1/job/get/:id` - Get job by ID
- `POST /api/v1/job/post` - Post new job (recruiter)
- `GET /api/v1/job/getadminjobs` - Get recruiter's jobs

### Company Routes
- `POST /api/v1/company/register` - Register company
- `GET /api/v1/company/get` - Get all companies
- `GET /api/v1/company/get/:id` - Get company by ID
- `PUT /api/v1/company/update/:id` - Update company

### Application Routes
- `POST /api/v1/application/apply/:id` - Apply to job
- `GET /api/v1/application/get` - Get user's applications
- `GET /api/v1/application/:id/applicants` - Get job applicants
- `POST /api/v1/application/status/:id/update` - Update status

---

## 🔐 Authentication

The application uses **JWT (JSON Web Tokens)** for authentication:
- Tokens stored in HTTP-only cookies
- Protected routes for authenticated users
- Role-based access (Job Seeker vs Recruiter)

---

## 📸 Screenshots

### Home Page
- Hero section with search
- Category carousel
- Latest job listings
- Modern glassmorphism design

### Job Listings
- Advanced filtering
- Real-time search
- Beautiful job cards
- Pagination support

### Dashboard (Recruiter)
- Company management
- Job posting
- Applicant tracking
- Analytics overview

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

**IgniteX** - Built with ❤️ and ☕ by passionate developers

---

## 🙏 Acknowledgments

- **Shadcn/ui** - For beautiful UI components
- **Tailwind CSS** - For utility-first styling
- **Framer Motion** - For smooth animations
- **Lucide Icons** - For clean, modern icons
- **Cloudinary** - For file storage solution

---

## 📧 Contact

For questions or support, please reach out:
- Email: hello@ignitex.com
- GitHub: [Your GitHub Profile]

---

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Chat system between recruiters and candidates
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Social media integration
- [ ] Resume builder
- [ ] Interview scheduling
- [ ] Salary insights
- [ ] Company reviews

---

**Made with 🔥 by IgniteX Team**

*Where Ambition Sparks Opportunity* 🚀
