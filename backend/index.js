import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Connect to database (once) before starting the server

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// CORS configuration - allow frontend domains
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    'https://ignitex-tawny.vercel.app' // Add your Vercel domain
].filter(Boolean); // Remove undefined values

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('❌ CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}

app.use(cors(corsOptions));

// api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Root route for base URL
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Ignitex Job Portal API is running 🚀",
        status: "success",
        environment: process.env.NODE_ENV || "development",
        mongo: process.env.MONGODB_URI ? "connected" : "not connected"
    });
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Start server after DB connection
const start = async () => {
    try {
        console.log('⏳ Starting server...');
        await connectDB();
        console.log('✅ DB connected, starting Express...');
        
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Server running at port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`Server address:`, server.address());
            console.log('🚀 Ready to accept connections');
        });
        
        // Keep server alive
        server.on('error', (error) => {
            console.error('❌ Server error:', error);
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use`);
                process.exit(1);
            }
        });
        
        server.on('listening', () => {
            console.log('👂 Server is listening...');
        });
        
        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Closing server gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
        
        process.on('SIGINT', () => {
            console.log('\nSIGINT received. Closing server gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
        
        console.log('🔧 Event handlers attached');
        
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

console.log('📦 Starting application...');
start().then(() => {
    console.log('✨ Startup complete');
}).catch((err) => {
    console.error('💥 Startup failed:', err);
    process.exit(1);
});