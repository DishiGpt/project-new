import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill all required fields: full name, email, phone number, password, and role",
                success: false
            });
        };

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
                success: false
            });
        }

        // Check for valid phone number (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({
                message: "Please enter a valid 10-digit phone number",
                success: false
            });
        }

        // Check if role is valid
        if (!['student', 'recruiter'].includes(role)) {
            return res.status(400).json({
                message: "Invalid role. Must be either 'student' or 'recruiter'",
                success: false
            });
        }

        let profilePhoto = undefined;
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                profilePhoto = cloudResponse.secure_url;
            } catch (uploadError) {
                console.error('Profile photo upload failed:', uploadError);
                // Continue registration even if photo upload fails
            }
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'An account already exists with this email address',
                success: false,
            })
        }

        // Check password strength
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: profilePhoto ? {
                profilePhoto: profilePhoto,
            } : undefined
        });

        return res.status(201).json({
            message: "Account created successfully! You can now log in.",
            success: true
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            message: error.message || "Registration failed. Please try again.",
            success: false
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary upload only if file provided
        let cloudResponse = null;
        if (file) {
            const fileUri = getDataUri(file);
            if (fileUri) {
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }
        }

        let skillsArray;
        if (skills) {
            skillsArray = typeof skills === 'string' ? skills.split(',') : Array.isArray(skills) ? skills : [];
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if (cloudResponse) {
            if (!user.profile) user.profile = {};
            user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
            if (file && file.originalname) user.profile.resumeOriginalName = file.originalname; // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}