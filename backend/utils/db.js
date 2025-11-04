import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Accept either MONGODB_URI (preferred) or MONGO_URI (older), with a localhost fallback for dev
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal';
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;